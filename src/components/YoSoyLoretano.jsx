import React, { useState, useEffect } from 'react';
import { PUBLICACIONES_INICIALES, DANZAS_TRADICIONALES_LORETO } from '../data/loretanoData';

export function YoSoyLoretano() {
  const [danzaActivaId, setDanzaActivaId] = useState('pandilla');
  const [reproduciendoRitmo, setReproduciendoRitmo] = useState(false);

  const [publicaciones, setPublicaciones] = useState(() => {
    try {
      const guardadas = localStorage.getItem('soy_loretano_publicaciones');
      if (guardadas) return JSON.parse(guardadas);
    } catch (e) {
      console.warn("No se pudo cargar localStorage:", e);
    }
    return PUBLICACIONES_INICIALES;
  });

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nombre, setNombre] = useState('');
  const [barrio, setBarrio] = useState('');
  const [categoria, setCategoria] = useState('Danza: La Pandilla Loretana 💃');
  const [mensaje, setMensaje] = useState('');
  const [fotoPreview, setFotoPreview] = useState(null);
  const [likesDados, setLikesDados] = useState({});

  const danza = DANZAS_TRADICIONALES_LORETO.find(d => d.id === danzaActivaId) || DANZAS_TRADICIONALES_LORETO[0];

  // Guardar en localStorage cuando haya cambios
  useEffect(() => {
    try {
      localStorage.setItem('soy_loretano_publicaciones', JSON.stringify(publicaciones));
    } catch (e) {
      console.warn("No se pudo guardar en localStorage:", e);
    }
  }, [publicaciones]);

  // Simulación de ritmo de bombo baile con Web Audio API
  const reproducirRitmoBombo = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      setReproduciendoRitmo(true);

      const tocarGolpe = (tiempo, freq, duracion, ganancia) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(freq, tiempo);
        osc.frequency.exponentialRampToValueAtTime(30, tiempo + duracion);
        gain.gain.setValueAtTime(ganancia, tiempo);
        gain.gain.exponentialRampToValueAtTime(0.001, tiempo + duracion);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(tiempo);
        osc.stop(tiempo + duracion);
      };

      const now = ctx.currentTime;
      // Compás amazónico rítmico: Bum... bum bum... ¡Bum!
      const patron = [0, 0.25, 0.45, 0.75, 1.0, 1.25, 1.45, 1.75];
      patron.forEach((t, idx) => {
        const freq = idx % 2 === 0 ? 95 : 130;
        tocarGolpe(now + t, freq, 0.22, 0.7);
      });

      setTimeout(() => {
        setReproduciendoRitmo(false);
      }, 2000);
    } catch (err) {
      console.warn("Web Audio API no soportado:", err);
      setReproduciendoRitmo(false);
    }
  };

  // Manejo de subida de archivo de imagen
  const handleArchivoFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        alert("La imagen es un poco pesada. Por favor sube una imagen menor a 3MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublicar = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !mensaje.trim()) {
      alert("Por favor escribe tu nombre y tu mensaje de orgullo.");
      return;
    }

    const nuevaPublicacion = {
      id: Date.now(),
      autor: `${nombre.trim()}`,
      barrio: barrio.trim() || "Iquitos, Loreto",
      categoria: categoria,
      mensaje: mensaje.trim(),
      foto: fotoPreview,
      likes: 1,
      tipo: 'baile',
      avatarColor: danza.color || 'verde'
    };

    setPublicaciones([nuevaPublicacion, ...publicaciones]);
    setMostrarModal(false);
    setNombre('');
    setBarrio('');
    setMensaje('');
    setFotoPreview(null);
    alert("¡Publicación subida con éxito! Gracias por compartir tu orgullo loretano 🌴💖");
  };

  const darLike = (id) => {
    if (likesDados[id]) return;

    setPublicaciones(prev =>
      prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p)
    );
    setLikesDados(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section id="yo-soy-loretano" className="section-container danzas-section-container">
      <div className="section-header">
        <span className="badge-tag tag-danzas-badge">💃 Ritmo, Pasión e Identidad Amazónica</span>
        <h2 className="section-title danzas-section-title">
          Danzas Tradicionales de Loreto: ¡Nuestra Alegría y Fuerza Selvática!
        </h2>
        <p className="section-desc danzas-section-desc">
          En Iquitos y todo Loreto, el orgullo se baila con el corazón descalzo sobre la tierra.
          Conoce los orígenes, pasos, instrumentos y vestimentas de nuestras 4 danzas emblemáticas:
          <strong> La Pandilla</strong>, <strong>El Buri Buriti</strong>, <strong>Orgullo Shipibo</strong> y <strong>El Sitaracuy</strong>.
        </p>
      </div>

      {/* Selector de las 4 Danzas Tradicionales */}
      <div className="danzas-selector-grid">
        {DANZAS_TRADICIONALES_LORETO.map(d => (
          <button
            key={d.id}
            onClick={() => {
              setDanzaActivaId(d.id);
            }}
            className={`btn-danza-tab tab-glow-${d.color} ${danzaActivaId === d.id ? 'active' : ''}`}
          >
            <span className="danza-tab-icon">{d.icono}</span>
            <div className="danza-tab-text">
              <strong className="danza-tab-name">{d.nombre}</strong>
              <small className="danza-tab-sub">{d.subtitulo.split('(')[0]}</small>
            </div>
          </button>
        ))}
      </div>

      {/* Vitrina Interactiva de la Danza Seleccionada */}
      <div className={`danza-showcase-card border-danza-${danza.color}`}>
        <div className="danza-showcase-header">
          <div className="danza-header-left">
            <span className={`pill-badge badge-${danza.color}`}>Danza Tradicional Loretana</span>
            <h3 className="danza-titulo-monumental">{danza.nombre}</h3>
            <span className="danza-subtitulo-hero">✨ {danza.subtitulo}</span>
            <span className="danza-origen-tag">📍 <strong>Origen:</strong> {danza.origen}</span>
          </div>

          <div className="danza-art-emblem">
            <span className="danza-giant-emoji">{danza.icono}</span>
            <button
              onClick={reproducirRitmoBombo}
              className={`btn-ritmo-bombo ${reproduciendoRitmo ? 'tocando' : ''}`}
              title="Escuchar compás de bombo"
            >
              {reproduciendoRitmo ? "🥁 ¡Tocando Bombo...!" : "🥁 Simular Golpe de Bombo"}
            </button>
          </div>
        </div>

        {/* Ficha Cultural de la Danza */}
        <div className="danza-detalles-grid">
          <div className="danza-detalle-box box-ritmo">
            <span className="det-icon">🎶</span>
            <div>
              <h4>Ritmo e Instrumentos:</h4>
              <p>{danza.ritmo}</p>
            </div>
          </div>

          <div className="danza-detalle-box box-paso">
            <span className="det-icon">👣</span>
            <div>
              <h4>Paso Característico:</h4>
              <p>{danza.paso}</p>
            </div>
          </div>

          <div className="danza-detalle-box box-vestimenta">
            <span className="det-icon">🪶</span>
            <div>
              <h4>Traje Típico y Accesorios:</h4>
              <p>{danza.vestimenta}</p>
            </div>
          </div>

          <div className="danza-detalle-box box-curiosidad">
            <span className="det-icon">💡</span>
            <div>
              <h4>Dato Curioso Loretano:</h4>
              <p>{danza.curiosidad}</p>
            </div>
          </div>
        </div>

        {/* Significado Cultural Profundo */}
        <div className="danza-significado-banner">
          <div className="significado-icon">📜</div>
          <div>
            <h4>Significado y Cosmogonía:</h4>
            <p>{danza.significado}</p>
          </div>
        </div>

        {/* Grito Tradicional y Botón de Acción */}
        <div className="danza-footer-row">
          <div className="danza-grito-box">
            <span className="quote-icon">🗣️</span>
            <em>"{danza.gritoLema}"</em>
          </div>

          <button onClick={() => setMostrarModal(true)} className="btn-subir-danza-cta">
            📸 ¡Subir mi foto bailando o con mi traje típico!
          </button>
        </div>
      </div>

      {/* Muro Comunitario de Danzas y Orgullo */}
      <div className="muro-danzas-wrapper">
        <div className="muro-danzas-header">
          <h3 className="muro-danzas-title">🌟 Muro de la Juventud Loretana: Danza y Tradición en Vivo</h3>
          <p className="muro-danzas-sub">
            Estudiantes y jóvenes de los barrios de Iquitos comparten su alegría vistiendo trajes y zapateando nuestras danzas.
          </p>
        </div>

        <div className="muro-publicaciones-grid">
          {publicaciones.map(pub => (
            <article key={pub.id} className="muro-post-card">
              <div className="post-header">
                <div className="post-avatar-wrap">
                  <div className={`post-avatar-icon avatar-bg-${pub.avatarColor || 'verde'}`}>
                    {pub.categoria.includes('Buri') ? '🏹' : pub.categoria.includes('Shipibo') ? '🪶' : pub.categoria.includes('Sitaracuy') ? '🐜' : '💃'}
                  </div>
                  <div className="post-autor-info">
                    <h4 className="post-nombre">{pub.autor}</h4>
                    <span className="post-barrio">📍 {pub.barrio}</span>
                  </div>
                </div>
                <span className="post-cat-badge">{pub.categoria}</span>
              </div>

              {/* Foto si fue subida por el usuario */}
              {pub.foto ? (
                <div className="post-foto-wrap">
                  <img src={pub.foto} alt={`Foto de ${pub.autor}`} className="post-foto-img" />
                </div>
              ) : (
                <div className="post-foto-placeholder">
                  <span className="place-icon">
                    {pub.categoria.includes('Buri') ? '🏹🌴🐗' : pub.categoria.includes('Shipibo') ? '🪶✨🐍' : pub.categoria.includes('Sitaracuy') ? '🐜🔥🤣' : '🌴💃🕺'}
                  </span>
                  <span className="place-lbl">Momento de Danza y Orgullo Loretano</span>
                </div>
              )}

              <p className="post-mensaje">"{pub.mensaje}"</p>

              <div className="post-footer-actions">
                <button
                  className={`btn-like-post ${likesDados[pub.id] ? 'liked' : ''}`}
                  onClick={() => darLike(pub.id)}
                >
                  ❤️ {likesDados[pub.id] ? "¡Orgullo Enviado!" : "Dar Orgullo"} ({pub.likes})
                </button>
                <span className="post-verificado">✓ 100% Charapa</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal para subir foto y testimonio */}
      {mostrarModal && (
        <div className="modal-backdrop" onClick={() => setMostrarModal(false)}>
          <div className="modal-content modal-subir" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setMostrarModal(false)}>✕</button>

            <div className="modal-header-subir">
              <span className="badge-tag verde">Tu Participación</span>
              <h3 className="modal-subir-title">Comparte tu Danza y Orgullo Loretano</h3>
              <p>Muestra tu foto bailando La Pandilla, Buri Buriti, Orgullo Shipibo, Sitaracuy o luciendo tu traje típico de la selva.</p>
            </div>

            <form onSubmit={handlePublicar} className="form-subir-post">
              <div className="form-group">
                <label>Tu Nombre o Apodo:</label>
                <input
                  type="text"
                  placeholder="Ej: Luciana Rengifo (16 años)"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  required
                  className="input-subir"
                />
              </div>

              <div className="form-group">
                <label>Tu Colegio o Barrio en Iquitos:</label>
                <input
                  type="text"
                  placeholder="Ej: Colegio Morona Cocha / Barrio Belén / San Juan"
                  value={barrio}
                  onChange={e => setBarrio(e.target.value)}
                  className="input-subir"
                />
              </div>

              <div className="form-group">
                <label>¿Qué Danza o Traje estás mostrando?</label>
                <select
                  value={categoria}
                  onChange={e => setCategoria(e.target.value)}
                  className="input-subir select-subir"
                >
                  <option>Danza: La Pandilla Loretana 💃</option>
                  <option>Danza: El Buri Buriti 🏹</option>
                  <option>Danza: Orgullo Shipibo 🪶</option>
                  <option>Danza: El Sitaracuy 🐜</option>
                  <option>Mi Traje Típico Loretano 👑</option>
                  <option>Mi Comida Tradicional 🍲</option>
                </select>
              </div>

              <div className="form-group">
                <label>Subir tu Foto (opcional pero recomendado):</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleArchivoFoto}
                  className="input-file"
                />
                {fotoPreview && (
                  <div className="preview-mini-box">
                    <img src={fotoPreview} alt="Previsualización" className="img-preview" />
                    <button
                      type="button"
                      onClick={() => setFotoPreview(null)}
                      className="btn-quitar-foto"
                    >
                      Quitar foto
                    </button>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Tu Mensaje de Orgullo Loretano:</label>
                <textarea
                  placeholder="Ej: ¡Bailé la pandilla en el concurso de mi colegio! Antes me daba vergüenza vestirme con ropa típica, pero ahora siento orgullo de mis raíces. ¡Yo soy de Iquitos!"
                  value={mensaje}
                  onChange={e => setMensaje(e.target.value)}
                  required
                  rows={3}
                  className="input-subir textarea-subir"
                ></textarea>
              </div>

              <div className="form-actions-subir">
                <button type="submit" className="btn-publicar-final">
                  ✨ Publicar en el Muro
                </button>
                <button
                  type="button"
                  onClick={() => setMostrarModal(false)}
                  className="btn-cancelar-subir"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
