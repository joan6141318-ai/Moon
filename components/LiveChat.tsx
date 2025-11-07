

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { getAiInstance, encode, decode, decodeAudioData } from '../services/gemini';
import { GoogleGenAI, LiveSession, LiveServerMessage, Modality, Blob } from '@google/genai';
import { MicIcon, MicOffIcon } from './icons';

interface Transcription {
    text: string;
    source: 'user' | 'model';
}

type SpeakerState = 'idle' | 'intro' | 'listening' | 'responding' | 'error';

const LiveChat: React.FC = () => {
    const [speakerState, setSpeakerState] = useState<SpeakerState>('idle');
    const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
    const [responseTime, setResponseTime] = useState<number | null>(null);
    
    const sessionPromiseRef = useRef<Promise<LiveSession> | null>(null);
    const inputAudioContextRef = useRef<AudioContext | null>(null);
    const outputAudioContextRef = useRef<AudioContext | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const nextStartTimeRef = useRef<number>(0);
    const outputSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
    const modelSpeakingTimeoutRef = useRef<number | null>(null);
    const responseTimerRef = useRef<number | null>(null);
    
    const currentInputTranscriptionRef = useRef('');
    const currentOutputTranscriptionRef = useRef('');

    const cleanupResources = useCallback(() => {
        if (modelSpeakingTimeoutRef.current) {
            clearTimeout(modelSpeakingTimeoutRef.current);
            modelSpeakingTimeoutRef.current = null;
        }
        if (responseTimerRef.current) {
            clearInterval(responseTimerRef.current);
            responseTimerRef.current = null;
        }

        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            mediaStreamRef.current = null;
        }

        if (scriptProcessorRef.current) {
            scriptProcessorRef.current.disconnect();
            scriptProcessorRef.current.onaudioprocess = null;
            scriptProcessorRef.current = null;
        }
        
        if (sourceNodeRef.current) {
            sourceNodeRef.current.disconnect();
            sourceNodeRef.current = null;
        }

        if (inputAudioContextRef.current && inputAudioContextRef.current.state !== 'closed') {
            inputAudioContextRef.current.close().catch(console.error);
            inputAudioContextRef.current = null;
        }
        if (outputAudioContextRef.current && outputAudioContextRef.current.state !== 'closed') {
             outputAudioContextRef.current.close().catch(console.error);
             outputAudioContextRef.current = null;
        }

        outputSourcesRef.current.forEach(source => source.stop());
        outputSourcesRef.current.clear();
        nextStartTimeRef.current = 0;
        setResponseTime(null);
    }, []);

    const stopSession = useCallback(() => {
        if (sessionPromiseRef.current) {
            sessionPromiseRef.current.then(session => session.close()).catch(console.error);
            sessionPromiseRef.current = null;
        }
        cleanupResources();
        setSpeakerState('idle');
    }, [cleanupResources]);
    
    const handleMessage = useCallback(async (message: LiveServerMessage) => {
        if (message.serverContent?.outputTranscription) {
            currentOutputTranscriptionRef.current += message.serverContent.outputTranscription.text;
             setTranscriptions(prev => {
                const last = prev[prev.length - 1];
                if (last?.source === 'model') {
                    return [...prev.slice(0, -1), { ...last, text: currentOutputTranscriptionRef.current }];
                }
                return [...prev, { source: 'model', text: currentOutputTranscriptionRef.current }];
            });
        }
        
        if (message.serverContent?.inputTranscription) {
             if (responseTime !== null) {
                setResponseTime(null);
             }
             if (responseTimerRef.current) {
                clearInterval(responseTimerRef.current);
                responseTimerRef.current = null;
             }
             currentInputTranscriptionRef.current += message.serverContent.inputTranscription.text;
             setTranscriptions(prev => {
                const last = prev[prev.length - 1];
                if (last?.source === 'user') {
                    return [...prev.slice(0, -1), { ...last, text: currentInputTranscriptionRef.current }];
                }
                return [...prev, { source: 'user', text: currentInputTranscriptionRef.current }];
            });
        }
        
        if (message.serverContent?.turnComplete) {
            const isUserTurn = currentInputTranscriptionRef.current.trim().length > 0;
            if (isUserTurn) {
                if (responseTimerRef.current) clearInterval(responseTimerRef.current);
                const startTime = Date.now();
                setResponseTime(0);
                responseTimerRef.current = window.setInterval(() => {
                    setResponseTime((Date.now() - startTime) / 1000);
                }, 100);
            }
            currentInputTranscriptionRef.current = '';
            currentOutputTranscriptionRef.current = '';
        }

        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
        if (base64Audio && outputAudioContextRef.current) {
             if (responseTimerRef.current) {
                clearInterval(responseTimerRef.current);
                responseTimerRef.current = null;
            }
            setSpeakerState('responding');
            if (modelSpeakingTimeoutRef.current) {
                clearTimeout(modelSpeakingTimeoutRef.current);
            }

            const audioBuffer = await decodeAudioData(decode(base64Audio), outputAudioContextRef.current, 24000, 1);
            
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputAudioContextRef.current.currentTime);
            const source = outputAudioContextRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outputAudioContextRef.current.destination);
            source.addEventListener('ended', () => {
                outputSourcesRef.current.delete(source);
            });
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
            outputSourcesRef.current.add(source);
            
            const timeUntilFinish = (nextStartTimeRef.current - outputAudioContextRef.current.currentTime) * 1000;

            modelSpeakingTimeoutRef.current = window.setTimeout(() => {
                setSpeakerState(currentState => currentState === 'responding' ? 'listening' : currentState);
                modelSpeakingTimeoutRef.current = null;
            }, Math.max(0, timeUntilFinish) + 300);
        }

        if (message.serverContent?.interrupted) {
            outputSourcesRef.current.forEach(source => source.stop());
            outputSourcesRef.current.clear();
            nextStartTimeRef.current = 0;
        }

    }, [responseTime]);

    const startSession = useCallback(async () => {
        setSpeakerState('intro');
        setTranscriptions([]); // Clear transcriptions on new session start
        const ai = getAiInstance();

        const introText = "Hola, mi nombre es Luna, soy asistente oficial de Agencia MOON. Será un gusto poder atender tus dudas. ¿Me podrías brindar tu nombre, por favor?";
        
        const startListening = async () => {
            // Add transcription only AFTER intro audio has finished
            setTranscriptions([{ source: 'model', text: introText }]);
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaStreamRef.current = stream;

                sessionPromiseRef.current = ai.live.connect({
                    model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                    callbacks: {
                        onopen: () => {
                            setSpeakerState('listening');
                            if (!inputAudioContextRef.current || !mediaStreamRef.current) return;
                            
                            const source = inputAudioContextRef.current.createMediaStreamSource(mediaStreamRef.current);
                            sourceNodeRef.current = source;
                            const scriptProcessor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
                            scriptProcessorRef.current = scriptProcessor;
                            scriptProcessor.onaudioprocess = (event) => {
                                const inputData = event.inputBuffer.getChannelData(0);
                                const l = inputData.length;
                                const int16 = new Int16Array(l);
                                for (let i = 0; i < l; i++) {
                                    int16[i] = inputData[i] * 32768;
                                }
                                const pcmBlob: Blob = {
                                    data: encode(new Uint8Array(int16.buffer)),
                                    mimeType: 'audio/pcm;rate=16000',
                                };
                                sessionPromiseRef.current?.then(session => session.sendRealtimeInput({ media: pcmBlob }));

                                const outputBuffer = event.outputBuffer.getChannelData(0);
                                for (let i = 0; i < outputBuffer.length; i++) {
                                    outputBuffer[i] = 0;
                                }
                            };
                            source.connect(scriptProcessor);
                            scriptProcessor.connect(inputAudioContextRef.current.destination);
                        },
                        onmessage: handleMessage,
                        onerror: (e) => {
                            console.error('Session error:', e);
                            setSpeakerState('error');
                            cleanupResources();
                        },
                        onclose: () => {
                            cleanupResources();
                            setSpeakerState('idle');
                        },
                    },
                    config: {
                        responseModalities: [Modality.AUDIO],
                        inputAudioTranscription: {},
                        outputAudioTranscription: {},
                        speechConfig: {
                            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
                        },
                        tools: [],
                        systemInstruction: `Eres Luna, una asistente de voz amigable y profesional para Agency Moon. Te acabas de presentar y de pedirle su nombre al usuario. Tu primera tarea es escuchar su nombre. Una vez que te lo den, salúdalo amablemente (ej: "¡Hola, [nombre]! Es un placer. ¿Cómo puedo ayudarte hoy?"). A partir de ese momento, recuerda su nombre y úsalo ocasionalmente para personalizar la conversación.

No tienes acceso a internet; basa todas tus respuestas únicamente en la siguiente información interna sobre la agencia. Tu objetivo es ayudar a los streamers actuales y potenciales. Responde a sus preguntas de forma natural y servicial. Si no entiendes algo, pide que lo repitan.

Aquí está la base de datos interna de Agency Moon:

**Sobre Agency Moon:**
- **Misión:** Potenciar a los creadores de contenido, brindándoles las mejores oportunidades para que puedan convertir su pasión en una carrera profesional exitosa y sostenible.
- **Visión:** Ser la agencia líder a nivel mundial en la representación de talentos de streaming, reconocida por nuestra innovación, transparencia y el éxito de nuestros creadores.
- **Valores:** Compromiso, profesionalismo, comunidad y crecimiento constante. Creemos en el potencial de cada streamer y trabajamos para hacerlo brillar.

**Preguntas Frecuentes (FAQ):**
- **¿Qué necesito para unirme?** Para formar parte de nuestro equipo, es fundamental que cumplas con los siguientes requisitos:
  - **Edad:** 18 a 35 años.
  - **Disponibilidad:** Mínimo 2 horas diarias para tus transmisiones.
  - **Conexión a Internet:** Contar con una buena conexión.
  - **Iluminación:** Disponer de una buena iluminación.
  - **Personalidad:** Ser una persona carismática.
- **¿Hay algún costo por unirse?** No, unirse a Agency Moon es completamente gratuito. No hay costos de inscripción ni cuotas ocultas.
- **¿Qué beneficios obtengo al unirme?** ¡Nos complace que te intereses en nuestro equipo! Nuestro diferenciador es que como emisor obtendrás:
  - **Soporte y Atención Personalizada:** Atención 24/7 para resolver cualquier duda o problema.
  - **Información Oficial:** Acceso a actualizaciones y novedades directamente desde la plataforma.
  - **Comunidad y Dinámicas:** Oportunidad de participar en dinámicas oficiales y pertenecer a un grupo exclusivo de creadores.
  - **Incentivos Adicionales:** Posibilidad de obtener bonos personalizados por cumplimiento de objetivos, acceso al programa de referidos y dinámicas internas de la agencia.
- **¿Cómo y cuándo recibiré mis pagos?** Los pagos se realizan mensualmente en dólares, dentro de la primera semana de cada mes. Puedes retirar tu dinero directamente desde tu cuenta de emisor usando Payoneer o PayPal. Para nuestros streamers en Venezuela, también ofrecemos la opción de Zelle. Y lo más importante: no cobramos comisiones ni porcentajes. ¡Todo lo que generas es 100% tuyo!

**Información General:**
- **¿Qué es un PK?** Un PK (Player Knockout) es una batalla en vivo entre dos streamers. Los espectadores envían regalos para apoyar a su creador favorito, y quien reciba más valor en regalos gana la batalla. Es una excelente forma de interactuar y aumentar la monetización.
- **Bloqueos:** Los bloqueos en la plataforma pueden ocurrir por violaciones de las normas de la comunidad. Nuestro equipo te asesora sobre las mejores prácticas para evitar bloqueos y te asiste en caso de que ocurra uno para resolverlo lo antes posible.
- **Live Data:** Proporcionamos acceso a un panel de control con datos en tiempo real de tus transmisiones para analizar métricas y optimizar tu contenido.
- **Horas de Transmisión:** La consistencia es clave. Establecemos metas de horas mensuales que, al cumplirse, desbloquean recompensas. Cada transmisión debe durar al menos 1 hora para contar, con un máximo de 2 horas válidas por día.

**Tabla de Pagos:**
- La tabla de pagos es extensa y detallada. Si te preguntan por pagos, debes indicar al usuario que puede encontrar la tabla de pagos completa en la página web, en la sección "Pagos". Tu respuesta verbal debe ser clara y directa, por ejemplo: "Para ver todos los detalles de las metas y remuneraciones, te invito a consultar la sección de 'Pagos' en nuestra página web. Allí encontrarás la tabla completa y actualizada."
- No intentes leer los valores de la tabla ni mencionar URLs. Solo dirige al usuario a la sección correspondiente de la página.

**Contacto:**
- Si un usuario necesita contactar a un manager directamente para soporte o preguntas específicas, puede hacerlo a través de WhatsApp.
- **Manager 1:** El número es +52 811 880 7625.
- **Manager 2:** El número es +593 96 736 4089.
- Proporciona estos números si te preguntan cómo contactar a un manager o a soporte.

**Regla Crítica: Manejo de Preguntas Desconocidas**
Si un usuario pregunta algo que no puedes responder con la información proporcionada (por ejemplo, cómo crear una cuenta de Payoneer, detalles sobre otras agencias, etc.), sigue esta regla ESTRICTAMENTE:
1.  **NO** te justifiques ni menciones tus limitaciones. Frases como "No tengo esa información en mi base de datos" o "Como asistente, no puedo ayudarte con eso" están PROHIBIDAS.
2.  **INMEDIATAMENTE** y de forma amable, redirige al usuario a los contactos de los managers.
3.  Usa una respuesta directa como: "Para esa consulta específica, lo mejor es que te comuniques directamente con uno de nuestros managers por WhatsApp. Ellos podrán darte la información más precisa. Los números son +52 811 880 7625 y +593 96 736 4089."

Si te preguntan por las ganancias de la agencia o temas no relacionados con la información proporcionada, rechaza amablemente la pregunta.`,
                    },
                });

            } catch (error) {
                console.error('Failed to start session:', error);
                setSpeakerState('error');
                cleanupResources();
            }
        };

        try {
            inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            
            const ttsResponse = await ai.models.generateContent({
                model: "gemini-2.5-flash-preview-tts",
                contents: [{ parts: [{ text: introText }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
                },
            });

            const base64IntroAudio = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
            if (base64IntroAudio && outputAudioContextRef.current) {
                const audioBuffer = await decodeAudioData(decode(base64IntroAudio), outputAudioContextRef.current, 24000, 1);
                const source = outputAudioContextRef.current.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputAudioContextRef.current.destination);
                source.onended = startListening;
                source.start();
            } else {
                 console.warn("TTS generation failed or produced no audio. Starting listening immediately.");
                 startListening();
            }

        } catch (error) {
            console.error('Failed to generate TTS intro:', error);
            setSpeakerState('error');
            stopSession();
        }
    }, [handleMessage, stopSession, cleanupResources]);

    const handleToggleSession = () => {
        if (speakerState === 'idle' || speakerState === 'error') {
            startSession();
        } else {
            stopSession();
        }
    };

    useEffect(() => {
        return () => {
            stopSession();
        };
    }, [stopSession]);
    
    const statusText: Record<SpeakerState, string> = {
        idle: 'Inactivo',
        intro: 'Presentándome...',
        listening: 'Escuchando...',
        responding: 'Respondiendo...',
        error: 'Error. Haz clic para reiniciar.',
    };
    
    const buttonClasses: Record<SpeakerState, string> = {
        idle: 'bg-purple-600 hover:bg-purple-700',
        intro: 'bg-purple-500 hover:bg-purple-600 animate-pulse-purple',
        listening: 'bg-green-500 hover:bg-green-600 animate-pulse-green',
        responding: 'bg-purple-500 hover:bg-purple-600 animate-pulse-purple',
        error: 'bg-red-600 hover:bg-red-700',
    };

    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/30 p-6 rounded-2xl w-full max-w-2xl mx-auto flex flex-col items-center gap-4">
            <h3 className="text-2xl font-bold text-white">Prueba nuestro Asistente de Voz</h3>
            <p className="text-gray-400 text-center">Habla directamente con Luna para obtener respuestas instantáneas. Haz clic en el micrófono para comenzar.</p>
            <div className="flex flex-col items-center gap-4">
                 <button onClick={handleToggleSession} className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${buttonClasses[speakerState]} text-white shadow-lg`}>
                    {speakerState === 'idle' || speakerState === 'error' ? <MicOffIcon className="w-10 h-10" /> : <MicIcon className="w-10 h-10" />}
                </button>
                <div className="h-6 flex items-center gap-3">
                    <p className="text-purple-300 font-medium">{statusText[speakerState]}</p>
                    {responseTime !== null && (
                        <div className="text-xs text-gray-400 bg-black/40 px-2 py-1 rounded-md flex items-center font-mono" role="timer" aria-live="polite">
                           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-clock mr-1.5" viewBox="0 0 16 16">
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                            </svg>
                            {responseTime.toFixed(1)}s
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full h-48 bg-black/30 rounded-lg p-4 overflow-y-auto mt-4 border border-gray-700">
                {transcriptions.map((t, i) => (
                    <p key={i} className={`text-sm mb-1 ${t.source === 'user' ? 'text-gray-300' : 'text-white'}`}>
                        <span className={`font-bold ${t.source === 'model' ? 'text-purple-300' : ''}`}>{t.source === 'user' ? 'Tú' : 'Luna'}: </span>{t.text}
                    </p>
                ))}
                 {transcriptions.length === 0 && <p className="text-gray-500 text-sm">La transcripción aparecerá aquí...</p>}
            </div>
            <style>{`
                @keyframes pulse-purple {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.7); }
                    50% { box-shadow: 0 0 0 1rem rgba(168, 85, 247, 0); }
                }
                @keyframes pulse-green {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
                    50% { box-shadow: 0 0 0 1rem rgba(34, 197, 94, 0); }
                }
                .animate-pulse-purple { animation: pulse-purple 2s infinite; }
                .animate-pulse-green { animation: pulse-green 2s infinite; }
            `}</style>
        </div>
    );
};

export default LiveChat;