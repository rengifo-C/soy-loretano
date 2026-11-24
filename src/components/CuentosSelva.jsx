import React, { useState, useEffect } from 'react';
import { CUENTOS_ABUELITOS } from '../data/loretanoData';
import { DelfinRosado } from './AmazonDrawings';

export function CuentosSelva() {
  const [cuentoActivoId, setCuentoActivoId] = useState('chullachaqui');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [reproduciendo, setReproduciendo] = useState(false);
  const [segundoActual, setSegundoActual] = useState(0);
  const [narrandoVoz, setNarrandoVoz] = useState(false);
  const [tamanoLetra, setTamanoLetra] = useState('grande'); // 'normal', 'grande', 'extra'

  const categorias = [
    'Todos',
    'Espíritus del Monte',
    'Misterios del Agua',
    'Aves y Encantos'
  ];

  const cuentosFiltrados = CUENTOS_ABUELITOS.filter(c => {
    if (categoriaSeleccionada === 'Todos') return true;
    return c.categoria === categoriaSeleccionada;
  });

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
      utterance.rate = 0.88; // Ritmo pausado y cálido como un abuelo de la selva

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

  const esAbuelita = cuento.narrador.toLowerCase().includes('abuelita');

  return (
    <section id="cuentos" className="section-container bg-warm-forest cuentos-section-enhanced">
      <div className="section-header">
        <span className="badge-tag tag-magica">✨ Sabiduría Ancestral de Loreto</span>
        <h2 className="section-title cuentos-main-title">
          Cuentos Mágicos de la Selva Loretana
        </h2>
        <p className="section-desc cuentos-lead-desc">
          Voces milenarias que encantan el corazón: historias de advertencia, respeto a la madre naturaleza
          y amor por nuestras raíces amazónicas. ¡Toca un cuento y disfruta la magia!
        </p>

        {/* Filtros por Categoría */}
        <div className="cuentos-categorias-bar">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`btn-cat-cuento ${categoriaSeleccionada === cat ? 'active' : ''}`}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat === 'Todos' ? `🌟 Todos los Cuentos (${CUENTOS_ABUELITOS.length})` : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Selector de los 9 Cuentos Amazónicos con imágenes auténticas y tipografía llamativa */}
      <div className="cuentos-carrusel-grid">
        {cuentosFiltrados.map(c => (
          <button
            key={c.id}
            onClick={() => cambiarCuento(c.id)}
            className={`btn-cuento-card card-glow-${c.color} ${cuentoActivoId === c.id ? 'active' : ''}`}
          >
            <div className="cuento-card-icon-wrap">
              {c.imagen ? (
                <img src={c.imagen} alt={c.titulo} className="cuento-card-thumb-img" />
              ) : (
                <span className="cuento-card-icon">{c.videoThumbnail}</span>
              )}
            </div>
            <div className="cuento-card-info">
              <span className={`cuento-cat-tag tag-${c.color}`}>{c.categoria}</span>
              <strong className="cuento-card-title">{c.titulo}</strong>
              <small className="cuento-card-narrador">🗣️ {c.narrador.split('(')[0]}</small>
            </div>
            <span className="cuento-card-time">⏱️ {c.duracion}</span>
          </button>
        ))}
      </div>

      {/* Pantalla y Reproductor de Video del Abuelito */}
      <div className={`video-cuento-container border-glow-${cuento.color}`}>
        <div className="video-screen">
          <div className="video-ambient-bg">
            {/* Animación del abuelito en la choza amazónica */}
            <div className={`abuelito-avatar ${reproduciendo ? 'hablando' : ''}`}>
              <div className="avatar-face-glow">
                <span className="avatar-face">{esAbuelita ? '👵🏼' : '👴🏼'}</span>
              </div>
              <div className="avatar-fogon">🔥🪵</div>
              <span className="avatar-nombre-badge">{cuento.narrador.split('(')[0]}</span>
            </div>

            <div className="video-watermark">
              <span className="live-dot">●</span> Relato Loretano en Vivo
            </div>

            {/* Ilustración artística del Cuento */}
            <div className="video-art-bg">
              {cuento.imagen ? (
                <div className="video-cover-wrapper">
                  <img src={cuento.imagen} alt={cuento.titulo} className="cuento-video-cover-img" />
                  <div className="video-art-overlay-gradient"></div>
                </div>
              ) : (
                <span className="video-art-icon-giant">{cuento.videoThumbnail}</span>
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
              {narrandoVoz ? "🔊 Escuchando..." : "🎙️ Escuchar Voz"}
            </button>
          </div>
        </div>

        {/* Detalle y texto completo del cuento con tipografía mejorada */}
        <div className={`cuento-texto-box font-size-${tamanoLetra}`}>
          <div className="cuento-meta-header">
            <div className="meta-left">
              <span className={`pill-badge badge-vibrante-${cuento.color}`}>{cuento.categoria}</span>
              <span className="cuento-duracion">⏱️ {cuento.duracion} de sabiduría</span>
            </div>

            {/* Selector de tamaño de letra para fácil lectura */}
            <div className="font-size-controls">
              <span className="font-label">Letra:</span>
              <button
                className={`btn-font-sz ${tamanoLetra === 'normal' ? 'active' : ''}`}
                onClick={() => setTamanoLetra('normal')}
                title="Letra normal"
              >
                A
              </button>
              <button
                className={`btn-font-sz ${tamanoLetra === 'grande' ? 'active' : ''}`}
                onClick={() => setTamanoLetra('grande')}
                title="Letra grande"
              >
                A+
              </button>
              <button
                className={`btn-font-sz ${tamanoLetra === 'extra' ? 'active' : ''}`}
                onClick={() => setTamanoLetra('extra')}
                title="Letra extra grande"
              >
                A++
              </button>
            </div>
          </div>

          <h3 className="cuento-titulo-main">{cuento.titulo}</h3>
          
          <div className="cuento-narrador-row">
            <span className="narrador-avatar-mini">{esAbuelita ? '👵🏼' : '👴🏼'}</span>
            <div>
              <p className="cuento-narrador-tag">
                Narrado con cariño por: <strong>{cuento.narrador}</strong>
              </p>
              <p className="cuento-personaje-desc">
                🌟 <em>{cuento.personaje}</em>
              </p>
            </div>
          </div>

          {/* Frase del Abuelito en estilo pergamino manuscrito */}
          <div className="cuento-frase-destacada">
            <span className="quote-badge">“</span>
            <p className="frase-abuelito-texto">{cuento.fraseAbuelito}</p>
          </div>

          {/* Ilustración artística del Cuento */}
          {cuento.imagen && (
            <div className="cuento-art-showcase-box">
              <img src={cuento.imagen} alt={cuento.titulo} className="cuento-art-showcase-img" />
              <div className="cuento-art-caption">
                <span className="caption-tag">📸 {cuento.titulo}</span>
                <span className="caption-sub">🌟 {cuento.personaje}</span>
              </div>
            </div>
          )}

          {/* Párrafos del Cuento con Letra Capital */}
          <div className="cuento-parrafos">
            {cuento.cuentoCompleto.map((parrafo, idx) => (
              <p key={idx} className={`cuento-p ${idx === 0 ? 'primer-parrafo' : ''}`}>
                <span className="p-num">{idx + 1}.</span> {parrafo}
              </p>
            ))}
          </div>

          {/* Moraleja con recuadro resplandeciente */}
          <div className={`cuento-moraleja-card moraleja-${cuento.color}`}>
            <span className="mor-icon">💡</span>
            <div className="mor-content">
              <strong>Lección para los jóvenes loretanos:</strong>
              <p>{cuento.moraleja}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
