import React, { useState } from 'react';
import { CENTROS_TURISTICOS_IQUITOS } from '../data/loretanoData';
import { DelfinRosado, Guacamayo, Mototaxi, VictoriaRegia } from './AmazonDrawings';

export function Inicio({ onExplorar, onJugar }) {
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');
  const [centroSeleccionado, setCentroSeleccionado] = useState(null);

  const categorias = ['Todos', 'Históricos', 'Naturaleza', 'Paseos y Tradición'];

  const centrosFiltrados = CENTROS_TURISTICOS_IQUITOS.filter(c => {
    if (filtroCategoria === 'Todos') return true;
    if (filtroCategoria === 'Históricos') {
      return c.categoria.includes('Histórico') || c.categoria.includes('Arquitectónica') || c.categoria.includes('Neogótico');
    }
    if (filtroCategoria === 'Naturaleza') {
      return c.categoria.includes('Ecoturismo') || c.categoria.includes('Conservación');
    }
    if (filtroCategoria === 'Paseos y Tradición') {
      return c.categoria.includes('Paseo') || c.categoria.includes('Tradición') || c.categoria.includes('Juventud');
    }
    return true;
  });

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
              y tus centros históricos. <strong>¡El orgullo loretano se lleva en la sangre!</strong>
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

        {/* Gran Foto Ilustrada del Río Amazonas */}
        <div className="foto-card-main">
          <div className="foto-overlay">
            <span className="foto-tag">Río Amazonas • Iquitos, Perú</span>
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

        {/* =========================================================================
            VITRINA DE CENTROS TURÍSTICOS DE IQUITOS
            Incluye: Malecón Tarapacá, Plaza de Armas, Casa de Fierro, Catedral de San Juan,
            Mercado de Belén, Plaza 28 de Julio, Quistococha y el CREA
           ========================================================================= */}
        <div className="seccion-centros-turisticos">
          <div className="centros-header">
            <span className="badge-tag amarillo">Patrimonio y Naturaleza</span>
            <h2 className="centros-title">Centros Turísticos de Iquitos que Todo Loretano Debe Conocer</h2>
            <p className="centros-desc">
              Monumentos de hierro traídos de Europa, templos neogóticos, paseos frente al río y santuarios de fauna amazónica. ¡Conoce y presume tu tierra!
            </p>

            {/* Filtros rápidos por categoría */}
            <div className="centros-filtros">
              {categorias.map(cat => (
                <button
                  key={cat}
                  className={`btn-filtro-centro ${filtroCategoria === cat ? 'active' : ''}`}
                  onClick={() => setFiltroCategoria(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de los 8 Centros Turísticos */}
          <div className="centros-grid">
            {centrosFiltrados.map(centro => (
              <article
                key={centro.id}
                className={`centro-card border-${centro.color}`}
                onClick={() => setCentroSeleccionado(centro)}
              >
                {/* Imagen del Centro Turístico */}
                <div className="centro-img-container">
                  <img src={centro.imagen} alt={centro.nombre} className="centro-card-img" />
                  <span className="centro-icon-badge">{centro.icono}</span>
                  <span className={`pill-badge pill-${centro.color} centro-badge-float`}>
                    {centro.categoria}
                  </span>
                </div>

                <div className="centro-card-body">
                  <h3 className="centro-nombre">{centro.nombre}</h3>
                  <span className="centro-distrito">📍 {centro.distrito}</span>
                  <p className="centro-descripcion">{centro.descripcion}</p>

                  <div className="centro-saber-box">
                    <span className="saber-icon">✨</span>
                    <p><strong>Lo que debes saber:</strong> {centro.loQueDebesSaber}</p>
                  </div>

                  <div className="centro-card-footer">
                    <span className="btn-ver-detalle">Ver historia, fotos y datos curiosos →</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Modal de Detalle de Centro Turístico */}
        {centroSeleccionado && (
          <div className="modal-backdrop" onClick={() => setCentroSeleccionado(null)}>
            <div className="modal-content modal-centro-detalle" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setCentroSeleccionado(null)}>✕</button>

              {/* Banner de foto completa del centro turístico */}
              {centroSeleccionado.imagen && (
                <div className="modal-centro-img-header">
                  <img
                    src={centroSeleccionado.imagen}
                    alt={centroSeleccionado.nombre}
                    className="modal-centro-hero-img"
                  />
                  <div className="modal-centro-img-gradient">
                    <span className="modal-centro-caption-loc">📍 {centroSeleccionado.distrito}</span>
                  </div>
                </div>
              )}

              <div className="modal-centro-header">
                <span className="modal-centro-icono">{centroSeleccionado.icono}</span>
                <div>
                  <span className={`pill-badge pill-${centroSeleccionado.color}`}>
                    {centroSeleccionado.categoria}
                  </span>
                  <h3 className="modal-centro-title">{centroSeleccionado.nombre}</h3>
                  <span className="modal-centro-loc">📍 {centroSeleccionado.distrito}</span>
                </div>
              </div>

              <p className="modal-centro-desc">{centroSeleccionado.descripcion}</p>

              {/* Historia y orígenes */}
              {centroSeleccionado.historia && (
                <div className="modal-historia-card">
                  <h4>📜 Historia y Origen:</h4>
                  <p>{centroSeleccionado.historia}</p>
                </div>
              )}

              {/* Por qué es un orgullo */}
              <div className="modal-saber-card">
                <h4>🌟 ¿Por qué es un orgullo para los loretanos?</h4>
                <p>{centroSeleccionado.loQueDebesSaber}</p>
              </div>

              {/* Experiencia imperdible */}
              {centroSeleccionado.imperdible && (
                <div className="modal-imperdible-card">
                  <h4>📸 Experiencia Imperdible:</h4>
                  <p>{centroSeleccionado.imperdible}</p>
                </div>
              )}

              {/* Dato curioso */}
              <div className="modal-curioso-card">
                <h4>💡 Dato Curioso:</h4>
                <p>{centroSeleccionado.datoCurioso}</p>
              </div>

              <div className="modal-centro-actions">
                <button
                  className="btn-primary"
                  onClick={() => {
                    navigator.clipboard?.writeText?.(
                      `¡Visita ${centroSeleccionado.nombre} en ${centroSeleccionado.distrito}! ${centroSeleccionado.loQueDebesSaber}`
                    );
                    alert("¡Lugar copiado para compartir con amigos o en tareas escolares!");
                  }}
                >
                  📋 Copiar información del lugar
                </button>
                <button className="btn-secondary" onClick={() => setCentroSeleccionado(null)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contadores de Identidad */}
        <div className="contadores-identidad">
          <div className="contador-item">
            <span className="num-contador">100%</span>
            <span className="lbl-contador">Orgullo Loretano</span>
          </div>
          <div className="contador-item">
            <span className="num-contador">8</span>
            <span className="lbl-contador">Centros Turísticos Icónicos</span>
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
