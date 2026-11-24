import React, { useState, useEffect } from 'react';
import { CUENTOS_ABUELITOS } from '../data/loretanoData';
import { DelfinRosado } from './AmazonDrawings';

export function CuentosSelva() {
  const [cuentoActivoId, setCuentoActivoId] = useState('chullachaqui');
  const [reproduciendo, setReproduciendo] = useState(false);
  const [segundoActual, setSegundoActual] = useState(0);
  const [narrandoVoz, setNarrandoVoz] = useState(false);

  const cuento = CUENTOS_ABUELITOS.find(c => c.id === cuentoActivoId) || CUENTOS_ABUELITOS[0];

  // Simulación de reproducción de video del abuelito
  useEffect(() => {
    let intervalo = null;
    if (reproduciendo) {
      intervalo = setInterval(() => {
        setSegundoActual(prev => {
          if (prev >= 60) {
            setReproduciendo(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [reproduciendo]);

  // Cambiar cuento y reiniciar reproductor
  const cambiarCuento = (id) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setNarrandoVoz(false);
    setReproduciendo(false);
    setSegundoActual(0);
    setCuentoActivoId(id);
  };

  // Narración en voz alta con Web Speech API
  const toggleLecturaVoz = () => {
    if (!('speechSynthesis' in window)) {
      alert("Tu navegador no soporta síntesis de voz, pero puedes leer el cuento completo abajo.");
      return;
    }

    if (narrandoVoz) {
      window.speechSynthesis.cancel();
      setNarrandoVoz(false);
    } else {
      window.speechSynthesis.cancel();
      const textoParaLeer = `${cuento.titulo}. Narrado por ${cuento.narrador}. ${cuento.cuentoCompleto.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textoParaLeer);
      utterance.lang = 'es-PE';
      utterance.rate = 0.9; // Ritmo pausado y cariñoso como abuelito

      utterance.onend = () => {
        setNarrandoVoz(false);
      };
      utterance.onerror = () => {
        setNarrandoVoz(false);
      };

      window.speechSynthesis.speak(utterance);
      setNarrandoVoz(true);
      setReproduciendo(true);
    }
  };

  return (
    <section id="cuentos" className="section-container bg-warm-forest">
      <div className="section-header">
        <span className="badge-tag verde">Historias Ancestrales</span>
        <h2 className="section-title">Cuentos de la Selva Contados por Abuelitos</h2>
        <p className="section-desc">
          En Iquitos, las mejores historias no están en la televisión: las guardan en la memoria nuestros abuelitos.
          ¡Escucha a <strong>Abuelita Rosa</strong> y a <strong>Don Teófilo</strong>!
        </p>
      </div>

      {/* Selector de Cuentos */}
      <div className="cuentos-tabs-wrapper">
        {CUENTOS_ABUELITOS.map(c => (
          <button
            key={c.id}
            onClick={() => cambiarCuento(c.id)}
            className={`btn-cuento-tab ${cuentoActivoId === c.id ? 'active' : ''} tab-${c.color}`}
          >
            <span className="cuento-tab-icon">{c.videoThumbnail}</span>
            <div className="cuento-tab-text">
              <strong>{c.titulo}</strong>
              <small>{c.narrador.split('(')[0]}</small>
            </div>
          </button>
        ))}
      </div>

      {/* Pantalla y Reproductor de Video del Abuelito */}
      <div className={`video-cuento-container border-${cuento.color}`}>
        <div className="video-screen">
          <div className="video-ambient-bg">
            {/* Animación del abuelito en la choza amazónica */}
            <div className={`abuelito-avatar ${reproduciendo ? 'hablando' : ''}`}>
              <div className="avatar-face">
                {cuentoActivoId === 'chullachaqui' ? '👵🏼' : '👴🏼'}
              </div>
              <div className="avatar-fogon">🔥🪵</div>
            </div>

            <div className="video-watermark">
              <span className="live-dot">●</span> Relato Loretano en Vivo
            </div>

            {/* Ilustración de fondo */}
            <div className="video-art-bg">
              {cuentoActivoId === 'yacumama' ? (
                <DelfinRosado className="w-24 h-20 opacity-40" />
              ) : (
                <div className="chulla-icon-big">👣🌲</div>
              )}
            </div>

            {/* Botón central de Play / Pausa */}
            <button
              className="btn-play-center"
              onClick={() => {
                setReproduciendo(!reproduciendo);
                toggleLecturaVoz();
              }}
              title={reproduciendo ? "Pausar narración" : "Escuchar narración del abuelito"}
            >
              {reproduciendo ? "⏸️" : "▶️"}
            </button>
          </div>

          {/* Barra de Controles del Video */}
          <div className="video-controls-bar">
            <button
              onClick={() => {
                setReproduciendo(!reproduciendo);
                toggleLecturaVoz();
              }}
              className="btn-control-play"
            >
              {reproduciendo ? "Pausar" : "Reproducir"}
            </button>

            <div className="video-time-track">
              <div
                className="video-progress"
                style={{ width: `${(segundoActual / 60) * 100}%` }}
              ></div>
            </div>

            <span className="video-time-label">
              0:{segundoActual < 10 ? `0${segundoActual}` : segundoActual} / {cuento.duracion}
            </span>

            <button
              onClick={toggleLecturaVoz}
              className={`btn-voz-narrador ${narrandoVoz ? 'active' : ''}`}
            >
              {narrandoVoz ? "🔊 Narrando..." : "🎙️ Voz en vivo"}
            </button>
          </div>
        </div>

        {/* Detalle y texto completo del cuento */}
        <div className="cuento-texto-box">
          <div className="cuento-meta-header">
            <span className={`pill-badge pill-${cuento.color}`}>Cuento Tradicional</span>
            <span className="cuento-duracion">⏱️ {cuento.duracion}</span>
          </div>

          <h3 className="cuento-titulo-main">{cuento.titulo}</h3>
          <p className="cuento-narrador-tag">
            🗣️ Narrado por: <strong>{cuento.narrador}</strong>
          </p>

          <div className="cuento-frase-destacada">
            <span className="quote-badge">“</span>
            <em>{cuento.fraseAbuelito}</em>
          </div>

          <div className="cuento-parrafos">
            {cuento.cuentoCompleto.map((parrafo, idx) => (
              <p key={idx} className="cuento-p">
                <span className="p-num">{idx + 1}.</span> {parrafo}
              </p>
            ))}
          </div>

          <div className="cuento-moraleja-card">
            <span className="mor-icon">💡</span>
            <div>
              <strong>Lección para los jóvenes:</strong>
              <p>{cuento.moraleja}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
