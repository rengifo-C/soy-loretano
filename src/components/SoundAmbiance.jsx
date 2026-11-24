import React, { useState, useRef } from 'react';

/**
 * Generador de Ambiente Selvático con Web Audio API
 * Crea sonido de lluvia amazónica y suave brisa sin requerir archivos externos de audio
 */
export function SoundAmbiance() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const noiseSourceRef = useRef(null);

  const startJungleSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Generar ruido rosa/marrón suave que simula lluvia y viento en las copas de los árboles
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filtro para dar calidez de selva tropical
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 800;

      const gain = ctx.createGain();
      gain.gain.value = 0.15;
      gainNodeRef.current = gain;

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(0);
      noiseSourceRef.current = whiteNoise;
      setIsPlaying(true);
    } catch (err) {
      console.warn("No se pudo iniciar el audio:", err);
    }
  };

  const stopJungleSound = () => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopJungleSound();
    } else {
      startJungleSound();
    }
  };

  return (
    <div className="ambiance-player">
      <button
        onClick={toggleSound}
        className={`sound-btn ${isPlaying ? 'active' : ''}`}
        title={isPlaying ? "Silenciar ambiente amazónico" : "Escuchar lluvia de la selva"}
        aria-label="Control de sonido ambiental"
      >
        <span className="sound-icon">{isPlaying ? "🌧️🌿" : "🌴🔇"}</span>
        <span className="sound-text">
          {isPlaying ? "Lluvia de la Selva: ON" : "Vibra Amazónica: OFF"}
        </span>
        {isPlaying && <span className="sound-pulse"></span>}
      </button>
    </div>
  );
}
