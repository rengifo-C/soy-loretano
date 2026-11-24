import React, { useState } from 'react';
import { RECETAS_PASO_PASO } from '../data/loretanoData';
import { Paiche, VictoriaRegia } from './AmazonDrawings';

export function RecetasLoretanas() {
  const [recetaActivaId, setRecetaActivaId] = useState('juane');
  const [pasoActivoIndex, setPasoActivoIndex] = useState(0);
  const [pasosCompletados, setPasosCompletados] = useState({});
  const [ingredientesListos, setIngredientesListos] = useState({});

  const receta = RECETAS_PASO_PASO.find(r => r.id === recetaActivaId) || RECETAS_PASO_PASO[0];
  const pasoActual = receta.pasos[pasoActivoIndex];

  const cambiarReceta = (id) => {
    setRecetaActivaId(id);
    setPasoActivoIndex(0);
    setPasosCompletados({});
    setIngredientesListos({});
  };

  const togglePasoCompletado = (pasoNum) => {
    setPasosCompletados(prev => ({
      ...prev,
      [`${receta.id}-${pasoNum}`]: !prev[`${receta.id}-${pasoNum}`]
    }));
  };

  const toggleIngrediente = (index) => {
    setIngredientesListos(prev => ({
      ...prev,
      [`${receta.id}-${index}`]: !prev[`${receta.id}-${index}`]
    }));
  };

  return (
    <section id="recetas" className="section-container">
      <div className="section-header">
        <span className="badge-tag amarillo">Cocina Tradicional</span>
        <h2 className="section-title">Recetas Loretanas Paso a Paso</h2>
        <p className="section-desc">
          Aprende a preparar los tres manjares sagrados de nuestra tierra. ¡Cocinar en familia es el mejor acto de amor hacia nuestra cultura!
        </p>
      </div>

      {/* Selector de Recetas */}
      <div className="recetas-nav-pills">
        {RECETAS_PASO_PASO.map(r => (
          <button
            key={r.id}
            onClick={() => cambiarReceta(r.id)}
            className={`btn-receta-pill ${recetaActivaId === r.id ? 'active' : ''} border-${r.color}`}
          >
            <span className="receta-emoji">{r.icono}</span>
            <span className="receta-btn-nombre">{r.nombre.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Contenedor Principal de la Receta */}
      <div className={`receta-card-interactive border-${receta.color}`}>
        {/* Cabecera del Plato con Historia y Arte */}
        <div className="receta-hero-header">
          <div className="receta-header-info">
            <span className={`pill-badge pill-${receta.color}`}>100% Loreto</span>
            <h3 className="receta-title">{receta.nombre}</h3>
            <p className="receta-historia">"{receta.historia}"</p>

            <div className="receta-badges-meta">
              <span className="meta-badge">⏱️ {receta.tiempo}</span>
              <span className="meta-badge">👨‍🍳 {receta.dificultad}</span>
              <span className="meta-badge">🍃 Hojas de Bijao Frescas</span>
            </div>
          </div>

          <div className="receta-art-box">
            {receta.id === 'patarashca' && <Paiche className="w-36 h-28" />}
            {receta.id === 'juane' && <VictoriaRegia className="w-36 h-24" />}
            {receta.id === 'tacacho' && <div className="tacacho-giant-art">🍌🪵🥓</div>}
          </div>
        </div>

        {/* Sección de Ingredientes Interactivos */}
        <div className="ingredientes-checklist-box">
          <h4 className="checklist-title">
            🛒 Ingredientes que necesitas (toca para tachar los que ya tengas):
          </h4>
          <div className="ingredientes-grid">
            {receta.ingredientes.map((ing, idx) => {
              const estaListo = !!ingredientesListos[`${receta.id}-${idx}`];
              return (
                <div
                  key={idx}
                  onClick={() => toggleIngrediente(idx)}
                  className={`ingrediente-item ${estaListo ? 'completado' : ''}`}
                >
                  <span className="check-box-circle">{estaListo ? "✓" : "○"}</span>
                  <span className="ingrediente-nombre">{ing}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Módulo Paso a Paso Interactivo */}
        <div className="paso-a-paso-modulo">
          <div className="pasos-stepper-header">
            <h4>Preparación Paso a Paso:</h4>
            <div className="stepper-pills">
              {receta.pasos.map((p, idx) => (
                <button
                  key={p.numero}
                  onClick={() => setPasoActivoIndex(idx)}
                  className={`stepper-btn ${pasoActivoIndex === idx ? 'active-step' : ''} ${
                    pasosCompletados[`${receta.id}-${p.numero}`] ? 'step-done' : ''
                  }`}
                >
                  Paso {p.numero}
                  {pasosCompletados[`${receta.id}-${p.numero}`] && " ✓"}
                </button>
              ))}
            </div>
          </div>

          {/* Tarjeta del Paso Actual */}
          <div className="paso-actual-card">
            <div className="paso-card-top">
              <span className="paso-contador-badge">Paso {pasoActual.numero} de {receta.pasos.length}</span>
              <button
                className={`btn-check-paso ${pasosCompletados[`${receta.id}-${pasoActual.numero}`] ? 'listo' : ''}`}
                onClick={() => togglePasoCompletado(pasoActual.numero)}
              >
                {pasosCompletados[`${receta.id}-${pasoActual.numero}`] ? "✓ ¡Paso Completado!" : "○ Marcar como hecho"}
              </button>
            </div>

            <h4 className="paso-titulo">{pasoActual.titulo}</h4>
            <p className="paso-detalle">{pasoActual.detalle}</p>

            <div className="paso-tip-box">
              <span className="tip-icon">👵🏼</span>
              <div>
                <strong>El Secreto de la Abuelita:</strong>
                <p>{pasoActual.tip}</p>
              </div>
            </div>

            {/* Botones de navegación entre pasos */}
            <div className="paso-navegacion-actions">
              <button
                className="btn-paso-nav"
                disabled={pasoActivoIndex === 0}
                onClick={() => setPasoActivoIndex(prev => Math.max(0, prev - 1))}
              >
                ← Paso Anterior
              </button>

              {pasoActivoIndex < receta.pasos.length - 1 ? (
                <button
                  className="btn-paso-nav btn-paso-siguiente"
                  onClick={() => setPasoActivoIndex(prev => prev + 1)}
                >
                  Siguiente Paso →
                </button>
              ) : (
                <button
                  className="btn-paso-nav btn-paso-siguiente listo-total"
                  onClick={() => alert("¡Felicitaciones! Ya conoces la receta tradicional completa. ¡A disfrutar en familia!")}
                >
                  ¡Plato Listo para Servir! 😋🎉
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
