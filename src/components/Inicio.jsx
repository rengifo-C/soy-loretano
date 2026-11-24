import React from 'react';
import { DelfinRosado, Guacamayo, Mototaxi, VictoriaRegia } from './AmazonDrawings';

export function Inicio({ onExplorar, onJugar }) {
  return (
    <section id="inicio" className="inicio-section">
      {/* Banner Principal Monumental */}
      <div className="inicio-hero-container">
        <div className="inicio-header-badge">
          <span className="badge-pulse"></span>
          <span>Amazonía Peruana • Capital Ecológica del Mundo</span>
          <span className="badge-heart">💚</span>
        </div>

        <h1 className="inicio-mega-title">
          ¡Yo soy de <span className="highlight-iquitos">Iquitos!</span>
        </h1>

        <p className="inicio-lema">
          “Si eres de Iquitos tienes que saber esto”
        </p>

        <div className="inicio-manifiesto-box">
          <div className="manifiesto-icon">✨</div>
          <div className="manifiesto-text">
            <h3>¡Nunca sientas vergüenza de tus raíces!</h3>
            <p>
              En nuestra tierra nace el río más caudaloso del mundo, crecen plantas que curan el cuerpo y el alma,
              y nuestra gente tiene la sonrisa más cálida del Perú. Conoce tus cuentos, tus comidas, tus bailes
              y tus plantas. <strong>¡El orgullo loretano se lleva en la sangre!</strong>
            </p>
          </div>
        </div>

        {/* Acciones principales */}
        <div className="inicio-actions">
          <button onClick={onJugar} className="btn-jugar-inicio">
            🎮 Jugar: "¿Cuánto sabes de Loreto?"
          </button>
          <button onClick={onExplorar} className="btn-explorar-inicio">
            📖 Escuchar Cuentos de los Abuelos
          </button>
        </div>

        {/* Galería Visual / Foto Ilustrada de Iquitos */}
        <div className="foto-iquitos-showcase">
          <div className="foto-card-main">
            <div className="foto-overlay">
              <span className="foto-tag">Río Amazonas • Iquitos</span>
              <h3>Donde la Selva se une con el Cielo</h3>
              <p>El majestuoso río de color chocolate que baña nuestra historia y alimenta a miles de familias.</p>
            </div>
            {/* Elementos amazónicos integrados */}
            <div className="foto-art-float float-delfin">
              <DelfinRosado className="w-28 h-24" />
            </div>
            <div className="foto-art-float float-guacamayo">
              <Guacamayo className="w-24 h-28" />
            </div>
          </div>

          <div className="mini-fotos-grid">
            <div className="mini-foto-card card-malecon">
              <span className="mini-icon">🌅</span>
              <div className="mini-info">
                <strong>Malecón Tarapacá</strong>
                <span>El atardecer más hermoso frente al río Itaya</span>
              </div>
            </div>

            <div className="mini-foto-card card-mototaxi">
              <div className="mototaxi-art-wrap">
                <Mototaxi className="w-20 h-16" />
              </div>
              <div className="mini-info">
                <strong>La Ciudad del Mototaxi</strong>
                <span>El sonido alegre que recorre cada barrio</span>
              </div>
            </div>

            <div className="mini-foto-card card-flora">
              <div className="victoria-art-wrap">
                <VictoriaRegia className="w-20 h-16" />
              </div>
              <div className="mini-info">
                <strong>Victoria Regia & Plantas</strong>
                <span>Naturaleza viva en cochas y lagunas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contadores de Identidad */}
        <div className="contadores-identidad">
          <div className="contador-item">
            <span className="num-contador">100%</span>
            <span className="lbl-contador">Orgullo Loretano</span>
          </div>
          <div className="contador-item">
            <span className="num-contador">+50</span>
            <span className="lbl-contador">Cuentos Ancestrales</span>
          </div>
          <div className="contador-item">
            <span className="num-contador">#1</span>
            <span className="lbl-contador">Río más Largo del Planeta</span>
          </div>
          <div className="contador-item">
            <span className="num-contador">0%</span>
            <span className="lbl-contador">Vergüenza Cultural</span>
          </div>
        </div>
      </div>
    </section>
  );
}
