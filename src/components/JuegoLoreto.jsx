import React, { useState } from 'react';
import { PREGUNTAS_JUEGO_LORETO, NIVELES_JUEGO } from '../data/loretanoData';
import { Otorongo, Guacamayo } from './AmazonDrawings';

export function JuegoLoreto() {
  const [preguntaIndex, setPreguntaIndex] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [respuestasUsuario, setRespuestasUsuario] = useState({});
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [avisoNivel, setAvisoNivel] = useState(null);

  const preguntaActual = PREGUNTAS_JUEGO_LORETO[preguntaIndex];
  const totalPreguntas = PREGUNTAS_JUEGO_LORETO.length;

  // Determinar nivel actual según los puntos
  const nivelActual = NIVELES_JUEGO.find(
    n => puntos >= n.puntosMin && puntos <= n.puntosMax
  ) || NIVELES_JUEGO[NIVELES_JUEGO.length - 1];

  const handleResponder = (opcionIndex, esCorrecta, puntosGanados) => {
    if (respuestasUsuario[preguntaIndex] !== undefined) return;

    const nuevosPuntos = esCorrecta ? puntos + puntosGanados : puntos;
    setPuntos(nuevosPuntos);

    setRespuestasUsuario({
      ...respuestasUsuario,
      [preguntaIndex]: { opcionIndex, esCorrecta }
    });

    // Verificar si subió de nivel
    if (esCorrecta) {
      const nuevoNivel = NIVELES_JUEGO.find(
        n => nuevosPuntos >= n.puntosMin && nuevosPuntos <= n.puntosMax
      );
      if (nuevoNivel && nuevoNivel.nombre !== nivelActual.nombre) {
        setAvisoNivel(nuevoNivel);
        setTimeout(() => setAvisoNivel(null), 3500);
      }
    }
  };

  const handleSiguiente = () => {
    if (preguntaIndex < totalPreguntas - 1) {
      setPreguntaIndex(prev => prev + 1);
    } else {
      setJuegoTerminado(true);
    }
  };

  const reiniciarJuego = () => {
    setPreguntaIndex(0);
    setPuntos(0);
    setRespuestasUsuario({});
    setJuegoTerminado(false);
    setAvisoNivel(null);
  };

  const respondida = respuestasUsuario[preguntaIndex] !== undefined;

  return (
    <section id="juego" className="section-container bg-warm-forest">
      <div className="section-header">
        <span className="badge-tag rosado">Aprende Jugando</span>
        <h2 className="section-title">Juego: ¿Cuánto Sabes de Loreto?</h2>
        <p className="section-desc">
          ¡Gana puntos, demuestra cuánto conoces de nuestra selva y sube de nivel hasta convertirte en el Gran Sabio Loretano!
        </p>
      </div>

      {/* Notificación Flotante de Subida de Nivel */}
      {avisoNivel && (
        <div className="alerta-nivel-subido animate-bounce">
          <span className="alerta-icon">{avisoNivel.insignia}</span>
          <div className="alerta-text">
            <strong>¡FELICIDADES! ¡SUBISTE DE NIVEL!</strong>
            <p>Ahora eres: <span>{avisoNivel.nombre}</span></p>
          </div>
        </div>
      )}

      {/* Tablero del Juego */}
      <div className="juego-board-container">
        {/* Cabecera del Tablero: Nivel, Puntos y Progreso */}
        <div className="juego-stats-bar">
          <div className="stat-nivel-pill">
            <span className="insignia-badge">{nivelActual.insignia}</span>
            <div className="stat-nivel-info">
              <span className="nivel-lbl">Nivel Actual</span>
              <strong>{nivelActual.nombre}</strong>
            </div>
          </div>

          <div className="stat-puntos-box">
            <span className="puntos-lbl">Puntos Acumulados</span>
            <strong className="puntos-val">⭐ {puntos} pts</strong>
          </div>
        </div>

        {/* Barra de progreso de preguntas */}
        <div className="juego-progress-line">
          <div
            className="juego-progress-fill"
            style={{ width: `${((preguntaIndex + 1) / totalPreguntas) * 100}%` }}
          ></div>
        </div>

        {!juegoTerminado ? (
          <div className="pregunta-activa-card">
            <div className="pregunta-top-meta">
              <span className="meta-contador">Pregunta {preguntaIndex + 1} de {totalPreguntas}</span>
              <span className="meta-puntos-posibles">+100 Puntos</span>
            </div>

            <h3 className="pregunta-enunciado">{preguntaActual.pregunta}</h3>

            <div className="opciones-grid-juego">
              {preguntaActual.opciones.map((opc, idx) => {
                let opcClass = '';
                if (respondida) {
                  if (opc.esCorrecta) opcClass = 'correcta';
                  else if (respuestasUsuario[preguntaIndex].opcionIndex === idx) opcClass = 'incorrecta';
                  else opcClass = 'opaca';
                }

                return (
                  <button
                    key={idx}
                    className={`btn-opcion-juego ${opcClass}`}
                    onClick={() => handleResponder(idx, opc.esCorrecta, opc.puntos)}
                    disabled={respondida}
                  >
                    <span className="opcion-circulo">{String.fromCharCode(65 + idx)}</span>
                    <span className="opcion-texto-juego">{opc.texto}</span>
                    {respondida && opc.esCorrecta && <span className="signo-res">✓</span>}
                    {respondida && respuestasUsuario[preguntaIndex].opcionIndex === idx && !opc.esCorrecta && (
                      <span className="signo-res">✕</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Retroalimentación y botón siguiente */}
            {respondida && (
              <div className="retroalimentacion-box">
                <p className="retro-explicacion">
                  <strong>{respuestasUsuario[preguntaIndex].esCorrecta ? "🎉 ¡Respuesta Correcta! (+100 pts)" : "🌱 ¡Buen intento!"}</strong>{" "}
                  {preguntaActual.explicacion}
                </p>

                <button className="btn-continuar-juego" onClick={handleSiguiente}>
                  {preguntaIndex < totalPreguntas - 1 ? "Siguiente Pregunta →" : "Ver Mi Medalla Final 🏆"}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="pantalla-victoria-card">
            <div className="victoria-art">
              <Otorongo className="w-36 h-36" />
            </div>

            <span className="victoria-badge">{nivelActual.insignia} {nivelActual.nombre}</span>
            <h3 className="victoria-titulo">¡Felicidades, Joven Loretano!</h3>

            <div className="victoria-score">
              <span className="victoria-score-num">{puntos}</span>
              <span className="victoria-score-sub">Puntos de Orgullo Loretano</span>
            </div>

            <p className="victoria-mensaje">{nivelActual.mensaje}</p>

            <div className="victoria-diploma-box">
              <h4>📜 Compromiso con tu Tierra:</h4>
              <p>“Hoy prometo no olvidar las historias de mis abuelitos, saborear con orgullo el juane y el tacacho, y decir en cualquier parte del mundo con la frente en alto: <strong>¡Yo soy de Iquitos!</strong>”</p>
            </div>

            <div className="victoria-actions">
              <button onClick={reiniciarJuego} className="btn-jugar-inicio">
                🔄 Jugar de nuevo
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
