import React, { useState } from 'react';
import { INICIATIVAS_CULTURALES } from '../data/loretanoData';
import { Mototaxi, Guacamayo } from './AmazonDrawings';

export function FeriaYReto() {
  const [familiasComprometidas, setFamiliasComprometidas] = useState(128);
  const [retoAceptado, setRetoAceptado] = useState(false);

  const { diaLoretano, domingoSinCelular } = INICIATIVAS_CULTURALES;

  const aceptarReto = () => {
    if (!retoAceptado) {
      setFamiliasComprometidas(prev => prev + 1);
      setRetoAceptado(true);
      alert("¡Bravo! Tu familia se ha sumado al reto del 'Domingo sin celular'. ¡Este domingo la abuelita tiene la palabra!");
    }
  };

  return (
    <section id="iniciativas" className="section-container bg-warm-forest">
      <div className="section-header">
        <span className="badge-tag verde">Iniciativas de Orgullo</span>
        <h2 className="section-title">Nuestras Propuestas para Iquitos</h2>
        <p className="section-desc">
          Para que ningún joven loretano pierda su cultura, llevamos la tradición al colegio y a la casa.
        </p>
      </div>

      <div className="iniciativas-grid">
        {/* Tarjeta 1: Feria "Día Loretano" en el Colegio */}
        <article className="iniciativa-card card-colegio">
          <div className="iniciativa-header">
            <span className="iniciativa-badge badge-amarillo">🏫 En el Colegio</span>
            <h3 className="iniciativa-title">{diaLoretano.titulo}</h3>
            <p className="iniciativa-lema">“{diaLoretano.lema}”</p>
          </div>

          <p className="iniciativa-obj">{diaLoretano.objetivo}</p>

          <div className="actividades-list">
            {diaLoretano.actividades.map((act, idx) => (
              <div key={idx} className="actividad-item">
                <span className="act-icono">{act.icono}</span>
                <div className="act-info">
                  <strong>{act.nombre}</strong>
                  <p>{act.descripcion}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="iniciativa-footer">
            <button
              onClick={() => alert("¡Excelente iniciativa! Puedes presentar esta propuesta a los profesores y directores de tu colegio para celebrar el Día Loretano.")}
              className="btn-proponer-colegio"
            >
              📋 ¡Llevar esta propuesta a mi colegio!
            </button>
          </div>
        </article>

        {/* Tarjeta 2: "Domingo sin Celular" en Casa */}
        <article className="iniciativa-card card-familia">
          <div className="iniciativa-header">
            <span className="iniciativa-badge badge-rosado">🏡 En Casa con la Familia</span>
            <h3 className="iniciativa-title">{domingoSinCelular.titulo}</h3>
            <p className="iniciativa-lema">“{domingoSinCelular.lema}”</p>
          </div>

          <p className="iniciativa-obj">{domingoSinCelular.objetivo}</p>

          <div className="pasos-reto-box">
            <h4>¿Cómo cumplir el reto este domingo?</h4>
            <div className="pasos-reto-list">
              {domingoSinCelular.pasosReto.map((p, idx) => (
                <div key={idx} className="paso-reto-row">
                  <span className="num-circulo-reto">{p.paso}</span>
                  <p>{p.texto}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reto-compromiso-card">
            <p className="compromiso-text">{domingoSinCelular.compromiso}</p>
            <div className="reto-contador-box">
              <span className="num-familias">👨‍👩‍👧‍👦 {familiasComprometidas}</span>
              <span>familias ya aceptaron el reto en Iquitos</span>
            </div>

            <button
              onClick={aceptarReto}
              className={`btn-aceptar-reto ${retoAceptado ? 'aceptado' : ''}`}
            >
              {retoAceptado ? "✓ ¡Reto Aceptado en mi Hogar!" : "🤝 ¡Mi Familia Acepta el Reto!"}
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
