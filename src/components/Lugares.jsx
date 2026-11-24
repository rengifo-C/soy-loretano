import React from 'react';
import { LUGARES_IQUITOS } from '../data/loretanoData';
import { Mototaxi, Guacamayo } from './AmazonDrawings';

export function Lugares() {
  return (
    <section id="lugares" className="section-container bg-warm-forest">
      <div className="section-header">
        <span className="badge-tag marron">Rutas y Rincones</span>
        <h2 className="section-title">Lugares Icónicos de Iquitos</h2>
        <p className="section-desc">
          Desde la arquitectura de hierro traída de Europa hasta las aguas bendecidas del Amazonas. ¡Ponte tus sandalias y súbete al mototaxi!
        </p>
      </div>

      {/* Banner decorativo con Mototaxi */}
      <div className="mototaxi-banner">
        <div className="banner-text">
          <h3>🛺 ¡Súbete al Mototaxi, nos vamos de recorrido!</h3>
          <p>La ciudad de Iquitos no tiene conexión terrestre: ¡se llega por río o por aire! Moverse en mototaxi sintiendo el viento fresco de la tarde es una experiencia única en el mundo.</p>
        </div>
        <div className="banner-art">
          <Mototaxi className="w-36 h-28" />
        </div>
      </div>

      <div className="lugares-grid">
        {LUGARES_IQUITOS.map((lugar, index) => (
          <div key={index} className={`lugar-card border-${lugar.color}`}>
            <div className="lugar-header">
              <span className="lugar-distrito">📍 {lugar.distrito}</span>
              <span className={`pill-badge pill-${lugar.color}`}>Imperdible</span>
            </div>
            <h3 className="lugar-nombre">{lugar.nombre}</h3>
            <p className="lugar-desc">{lugar.descripcion}</p>
            <div className="lugar-destacado">
              <span className="dest-icon">✨</span>
              <p><strong>Lo que tienes que hacer:</strong> {lugar.destacado}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="guacamayo-callout">
        <Guacamayo className="w-24 h-28" />
        <div className="callout-content">
          <h4>¿Sabías que...?</h4>
          <p>
            Iquitos es la metrópoli más poblada del mundo a la que no se puede acceder por carretera. Solo puedes llegar en avión o surcando los majestuosos ríos de la selva peruana.
          </p>
        </div>
      </div>
    </section>
  );
}
