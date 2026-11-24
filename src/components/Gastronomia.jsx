import React, { useState } from 'react';
import { PLATOS_LORETANOS } from '../data/loretanoData';
import { VictoriaRegia, Paiche, FrutaAguaje } from './AmazonDrawings';

export function Gastronomia() {
  const [platoActivo, setPlatoActivo] = useState(PLATOS_LORETANOS[0].id);

  const platoSeleccionado = PLATOS_LORETANOS.find(p => p.id === platoActivo) || PLATOS_LORETANOS[0];

  return (
    <section id="gastronomia" className="section-container bg-warm-forest">
      <div className="section-header">
        <span className="badge-tag amarillo">Sabores de la Selva</span>
        <h2 className="section-title">Comida Loretana: ¡Para Chuparse los Dedos!</h2>
        <p className="section-desc">
          En Iquitos se come con devoción. Con hojas de bijao, carbón de monte y ají charapita, ¡estos son los manjares que todo loretano lleva en el corazón!
        </p>
      </div>

      {/* Navegación rápida por platos */}
      <div className="platos-tabs">
        {PLATOS_LORETANOS.map(plato => (
          <button
            key={plato.id}
            onClick={() => setPlatoActivo(plato.id)}
            className={`tab-plato-btn ${platoActivo === plato.id ? 'active' : ''} border-${plato.color}`}
          >
            <span className="tab-emoji">{plato.emoji}</span>
            <span className="tab-name">{plato.nombre.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Tarjeta destacada interactiva del plato */}
      <div className={`plato-featured-card card-${platoSeleccionado.color}`}>
        <div className="plato-card-left">
          <div className="plato-illustration-wrap">
            {platoSeleccionado.id === 'patarashca' && <Paiche className="w-40 h-28" />}
            {platoSeleccionado.id === 'aguaje' && <FrutaAguaje className="w-28 h-28" />}
            {platoSeleccionado.id === 'juane' && <VictoriaRegia className="w-36 h-28" />}
            {platoSeleccionado.id !== 'patarashca' && platoSeleccionado.id !== 'aguaje' && platoSeleccionado.id !== 'juane' && (
              <div className="plato-big-emoji">{platoSeleccionado.emoji}</div>
            )}
          </div>
          <span className={`plato-apodo badge-${platoSeleccionado.color}`}>
            {platoSeleccionado.apodo}
          </span>
        </div>

        <div className="plato-card-right">
          <div className="plato-title-row">
            <h3 className="plato-nombre">{platoSeleccionado.nombre}</h3>
            <span className="plato-tag-region">100% Loreto</span>
          </div>

          <p className="plato-desc">{platoSeleccionado.descripcion}</p>

          <div className="plato-ingredientes-section">
            <h4 className="ingredientes-title">🌿 Ingredientes Tradicionales:</h4>
            <div className="ingredientes-chips">
              {platoSeleccionado.ingredientes.map((ing, idx) => (
                <span key={idx} className="ing-chip">
                  ✓ {ing}
                </span>
              ))}
            </div>
          </div>

          <div className="plato-secreto-box">
            <span className="secreto-icon">💡</span>
            <div className="secreto-text">
              <strong>El Secreto del Charapa:</strong>
              <p>{platoSeleccionado.secreto}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de todos los platos */}
      <div className="todos-platos-grid">
        {PLATOS_LORETANOS.map(plato => (
          <div
            key={plato.id}
            className={`mini-plato-card ${platoActivo === plato.id ? 'active-mini' : ''}`}
            onClick={() => setPlatoActivo(plato.id)}
          >
            <div className="mini-top">
              <span className="mini-emoji">{plato.emoji}</span>
              <span className={`mini-pill pill-${plato.color}`}>{plato.apodo}</span>
            </div>
            <h4 className="mini-title">{plato.nombre}</h4>
            <p className="mini-snippet">{plato.descripcion.slice(0, 90)}...</p>
            <span className="mini-link">Ver receta y secreto →</span>
          </div>
        ))}
      </div>
    </section>
  );
}
