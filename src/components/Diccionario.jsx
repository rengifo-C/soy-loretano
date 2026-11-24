import React, { useState } from 'react';
import { PALABRAS_LORETANAS } from '../data/loretanoData';

export function Diccionario() {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('Todas');
  const [palabraSeleccionada, setPalabraSeleccionada] = useState(null);

  const categorias = ['Todas', 'Expresiones', 'Vida diaria', 'Fauna', 'Costumbres', 'Mitos', 'Gastronomía'];

  const palabrasFiltradas = PALABRAS_LORETANAS.filter(item => {
    const coincideTexto = item.palabra.toLowerCase().includes(busqueda.toLowerCase()) ||
                          item.significado.toLowerCase().includes(busqueda.toLowerCase()) ||
                          item.ejemplo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaActiva === 'Todas' || item.categoria === categoriaActiva;
    return coincideTexto && coincideCategoria;
  });

  return (
    <section id="diccionario" className="section-container">
      <div className="section-header">
        <span className="badge-tag verde">Vocabulario Charapa</span>
        <h2 className="section-title">Diccionario del Verdadero Loretano</h2>
        <p className="section-desc">
          Si vas a pasear por el Malecón Tarapacá o conversar con un compadre en el puerto, ¡estas palabras son ley!
        </p>
      </div>

      {/* Barra de búsqueda y categorías */}
      <div className="diccionario-controls">
        <div className="search-bar-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar palabra, significado o ejemplo... (ej. choche, avispa)"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="search-input"
          />
          {busqueda && (
            <button className="clear-search" onClick={() => setBusqueda('')}>✕</button>
          )}
        </div>

        <div className="category-chips">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`chip-btn ${categoriaActiva === cat ? 'active' : ''}`}
              onClick={() => setCategoriaActiva(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de palabras */}
      <div className="palabras-grid">
        {palabrasFiltradas.length > 0 ? (
          palabrasFiltradas.map((item, index) => (
            <article
              key={index}
              className={`palabra-card border-${item.color}`}
              onClick={() => setPalabraSeleccionada(item)}
            >
              <div className="palabra-header">
                <span className={`cat-pill pill-${item.color}`}>{item.categoria}</span>
                <span className="card-hint">Toca para ver detalle ✨</span>
              </div>
              <h3 className="palabra-term">{item.palabra}</h3>
              <p className="palabra-def">{item.significado}</p>
              <div className="palabra-ejemplo">
                <span className="quote-icon">“</span>
                <em>{item.ejemplo}</em>
              </div>
            </article>
          ))
        ) : (
          <div className="no-results">
            <span className="no-res-icon">🦜</span>
            <p>¡Ayayay! No encontramos ninguna palabra con "<strong>{busqueda}</strong>".</p>
            <button onClick={() => { setBusqueda(''); setCategoriaActiva('Todas'); }} className="btn-secondary">
              Ver todas las palabras
            </button>
          </div>
        )}
      </div>

      {/* Modal interactivo de detalle de palabra */}
      {palabraSeleccionada && (
        <div className="modal-backdrop" onClick={() => setPalabraSeleccionada(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setPalabraSeleccionada(null)}>✕</button>
            <span className={`cat-pill pill-${palabraSeleccionada.color}`}>
              {palabraSeleccionada.categoria}
            </span>
            <h3 className="modal-title">{palabraSeleccionada.palabra}</h3>
            <p className="modal-def">{palabraSeleccionada.significado}</p>
            <div className="modal-ejemplo-box">
              <span className="box-title">🗣️ En una conversación loretana:</span>
              <p className="box-text">"{palabraSeleccionada.ejemplo}"</p>
            </div>
            <div className="modal-actions">
              <button
                className="btn-primary"
                onClick={() => {
                  navigator.clipboard?.writeText?.(
                    `${palabraSeleccionada.palabra}: ${palabraSeleccionada.significado} - "${palabraSeleccionada.ejemplo}"`
                  );
                  alert("¡Palabra copiada para compartir con tus amigos!");
                }}
              >
                📋 Copiar para compartir
              </button>
              <button className="btn-secondary" onClick={() => setPalabraSeleccionada(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
