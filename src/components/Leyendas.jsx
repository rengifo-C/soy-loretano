import React, { useState } from 'react';
import { LEYENDAS_LORETANAS } from '../data/loretanoData';
import { DelfinRosado } from './AmazonDrawings';

export function Leyendas() {
  const [leyendaAbierta, setLeyendaAbierta] = useState(null);

  return (
    <section id="leyendas" className="section-container">
      <div className="section-header">
        <span className="badge-tag rosado">Mitos y Misterios</span>
        <h2 className="section-title">Leyendas de la Selva Profunda</h2>
        <p className="section-desc">
          Cuando cae el sol en la selva, los relatos de los abuelos cobran vida. ¡No salgas al monte sin conocer estas historias!
        </p>
      </div>

      <div className="leyendas-grid">
        {LEYENDAS_LORETANAS.map((leyenda) => (
          <article key={leyenda.id} className={`leyenda-card border-${leyenda.color}`}>
            <div className="leyenda-top">
              {leyenda.id === 'bufeo' && (
                <div className="leyenda-illustration-box">
                  <DelfinRosado className="w-24 h-20" />
                </div>
              )}
              {leyenda.id === 'tunche' && <div className="leyenda-emoji-box">🦉💨</div>}
              {leyenda.id === 'chullachaqui' && <div className="leyenda-emoji-box">👣🌲</div>}
              {leyenda.id === 'yacumama' && <div className="leyenda-emoji-box">🌊🐍</div>}

              <div>
                <span className={`cat-pill pill-${leyenda.color}`}>Misterio Amazónico</span>
                <h3 className="leyenda-titulo">{leyenda.titulo}</h3>
                <h4 className="leyenda-subtitulo">{leyenda.subtitulo}</h4>
              </div>
            </div>

            <p className="leyenda-historia">
              {leyendaAbierta === leyenda.id ? leyenda.historia : `${leyenda.historia.slice(0, 160)}...`}
            </p>

            <button
              className="btn-toggle-historia"
              onClick={() => setLeyendaAbierta(leyendaAbierta === leyenda.id ? null : leyenda.id)}
            >
              {leyendaAbierta === leyenda.id ? "▲ Leer menos" : "▼ Continuar leyendo la leyenda"}
            </button>

            <div className="leyenda-advertencia">
              <span className="adv-icon">⚠️</span>
              <p><strong>Aviso del abuelo:</strong> {leyenda.advertencia}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
