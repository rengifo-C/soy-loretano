import React, { useState } from 'react';
import { PREGUNTAS_QUIZ } from '../data/loretanoData';
import { Otorongo, DelfinRosado } from './AmazonDrawings';

export function Quiz() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestasSeleccionadas, setRespuestasSeleccionadas] = useState({});
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const handleSeleccionarOpcion = (opcionIndex, esCorrecta) => {
    if (respuestasSeleccionadas[preguntaActual] !== undefined) return; // Ya respondió esta pregunta

    setRespuestasSeleccionadas({
      ...respuestasSeleccionadas,
      [preguntaActual]: { opcionIndex, esCorrecta }
    });
  };

  const handleSiguiente = () => {
    if (preguntaActual < PREGUNTAS_QUIZ.length - 1) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      setMostrarResultado(true);
    }
  };

  const handleReiniciar = () => {
    setPreguntaActual(0);
    setRespuestasSeleccionadas({});
    setMostrarResultado(false);
  };

  const calcularPuntaje = () => {
    return Object.values(respuestasSeleccionadas).filter(r => r.esCorrecta).length;
  };

  const totalPreguntas = PREGUNTAS_QUIZ.length;
  const puntaje = calcularPuntaje();
  const respuestaActual = respuestasSeleccionadas[preguntaActual];
  const itemPregunta = PREGUNTAS_QUIZ[preguntaActual];

  return (
    <section id="quiz" className="section-container">
      <div className="section-header">
        <span className="badge-tag verde">Juego Interactivo</span>
        <h2 className="section-title">Test: ¿Qué Tan Loretano Eres?</h2>
        <p className="section-desc">
          Demuestra cuánto sabes de Iquitos y de las costumbres de nuestra amada Amazonía.
        </p>
      </div>

      <div className="quiz-card">
        {!mostrarResultado ? (
          <>
            <div className="quiz-progress-bar-wrap">
              <div
                className="quiz-progress-bar"
                style={{ width: `${((preguntaActual + 1) / totalPreguntas) * 100}%` }}
              ></div>
            </div>

            <div className="quiz-top-info">
              <span className="pregunta-contador">
                Pregunta {preguntaActual + 1} de {totalPreguntas}
              </span>
              <span className="puntos-temporales">
                Puntaje actual: <strong>{puntaje} pts</strong>
              </span>
            </div>

            <h3 className="quiz-pregunta-texto">{itemPregunta.pregunta}</h3>

            <div className="quiz-opciones-list">
              {itemPregunta.opciones.map((opcion, idx) => {
                const yaRespondio = respuestaActual !== undefined;
                let estadoClass = '';

                if (yaRespondio) {
                  if (opcion.esCorrecta) {
                    estadoClass = 'opcion-correcta';
                  } else if (respuestaActual.opcionIndex === idx) {
                    estadoClass = 'opcion-incorrecta';
                  } else {
                    estadoClass = 'opcion-opaca';
                  }
                }

                return (
                  <button
                    key={idx}
                    className={`quiz-opcion-btn ${estadoClass}`}
                    onClick={() => handleSeleccionarOpcion(idx, opcion.esCorrecta)}
                    disabled={yaRespondio}
                  >
                    <span className="opcion-letra">{String.fromCharCode(65 + idx)}</span>
                    <span className="opcion-texto">{opcion.texto}</span>
                    {yaRespondio && opcion.esCorrecta && <span className="check-icon">✓</span>}
                    {yaRespondio && respuestaActual.opcionIndex === idx && !opcion.esCorrecta && (
                      <span className="cross-icon">✕</span>
                    )}
                  </button>
                );
              })}
            </div>

            {respuestaActual && (
              <div className="quiz-retroalimentacion">
                <p className="retro-texto">
                  <strong>{respuestaActual.esCorrecta ? "🎉 ¡Bien respondido!" : "😅 ¡Casi casi!"}</strong>{" "}
                  {itemPregunta.explicacion}
                </p>
                <button className="btn-siguiente-quiz" onClick={handleSiguiente}>
                  {preguntaActual < totalPreguntas - 1 ? "Siguiente Pregunta →" : "Ver Resultados Finales 🏆"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="quiz-resultado-final">
            <div className="resultado-art">
              {puntaje >= 4 ? (
                <Otorongo className="w-32 h-32" />
              ) : (
                <DelfinRosado className="w-32 h-28" />
              )}
            </div>

            <h3 className="resultado-titulo">
              {puntaje === 5 && "¡Loretano de Pura Cepa! 🌴✨"}
              {puntaje >= 3 && puntaje < 5 && "¡Casi casi Charapa! 🍌"}
              {puntaje < 3 && "¡Turista con Mucho Amor a la Selva! 🚤"}
            </h3>

            <div className="resultado-score-box">
              <span className="score-number">{puntaje}</span>
              <span className="score-total">de {totalPreguntas} correctas</span>
            </div>

            <p className="resultado-mensaje">
              {puntaje === 5 &&
                "¡Increíble! Conoces las leyendas, la comida, el mototaxi y las costumbres como un auténtico habitante de Iquitos. ¡Orgullo loretano!"}
              {puntaje >= 3 && puntaje < 5 &&
                "¡Muy buen puntaje! Conoces muy bien la selva, te falta solo un platito de patarashca y un paseo en balsa por Belén para coronarte."}
              {puntaje < 3 &&
                "¡Tienes un alma aventurera! Iquitos te espera con los brazos abiertos para disfrutar de un juane a orillas del río Amazonas."}
            </p>

            <button className="btn-primary" onClick={handleReiniciar}>
              🔄 Intentar el test de nuevo
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
