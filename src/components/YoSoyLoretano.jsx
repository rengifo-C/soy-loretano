import React, { useState, useEffect } from 'react';
import { PUBLICACIONES_INICIALES } from '../data/loretanoData';

export function YoSoyLoretano() {
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
  const [categoria, setCategoria] = useState('Mi Comida Típica 🍲');
  const [mensaje, setMensaje] = useState('');
  const [fotoPreview, setFotoPreview] = useState(null);
  const [likesDados, setLikesDados] = useState({});

  // Guardar en localStorage cuando haya cambios
  useEffect(() => {
    try {
      localStorage.setItem('soy_loretano_publicaciones', JSON.stringify(publicaciones));
    } catch (e) {
      console.warn("No se pudo guardar en localStorage:", e);
    }
  }, [publicaciones]);

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
      tipo: categoria.includes('Baile') ? 'baile' : categoria.includes('Traje') ? 'traje' : 'comida',
      avatarColor: 'verde'
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
    <section id="yo-soy-loretano" className="section-container">
      <div className="section-header">
        <span className="badge-tag rosado">Comunidad Joven</span>
        <h2 className="section-title">Espacio: ¡Yo Soy Loretano!</h2>
        <p className="section-desc">
          Este es el muro de la juventud de Iquitos. Sube tu foto con tu comida favorita, tu traje típico o tu baile y di con orgullo: <strong>¡Yo soy de Iquitos!</strong>
        </p>
        <button onClick={() => setMostrarModal(true)} className="btn-subir-foto-cta">
          📸 ¡Subir mi foto o momento de orgullo!
        </button>
      </div>

      {/* Muro de Publicaciones de los Jóvenes */}
      <div className="muro-publicaciones-grid">
        {publicaciones.map(pub => (
          <article key={pub.id} className="muro-post-card">
            <div className="post-header">
              <div className="post-avatar-wrap">
                <div className={`post-avatar-icon avatar-bg-${pub.avatarColor || 'verde'}`}>
                  {pub.tipo === 'baile' ? '💃' : pub.tipo === 'traje' ? '🪶' : '🍲'}
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
                  {pub.tipo === 'baile' ? '🌴💃🕺' : pub.tipo === 'traje' ? '👑🪶✨' : '🍃🍲🍌'}
                </span>
                <span className="place-lbl">Momento de Orgullo Loretano</span>
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

      {/* Modal para subir foto y testimonio */}
      {mostrarModal && (
        <div className="modal-backdrop" onClick={() => setMostrarModal(false)}>
          <div className="modal-content modal-subir" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setMostrarModal(false)}>✕</button>

            <div className="modal-header-subir">
              <span className="badge-tag verde">Tu Momento</span>
              <h3 className="modal-subir-title">Comparte tu Orgullo Loretano</h3>
              <p>Muestra tu foto con comida típica, traje tradicional, danza o tu rincón favorito de Iquitos.</p>
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
                  placeholder="Ej: Colegio Morona Cocha / Barrio Belén"
                  value={barrio}
                  onChange={e => setBarrio(e.target.value)}
                  className="input-subir"
                />
              </div>

              <div className="form-group">
                <label>¿Qué estás mostrando?</label>
                <select
                  value={categoria}
                  onChange={e => setCategoria(e.target.value)}
                  className="input-subir select-subir"
                >
                  <option>Mi Comida Típica 🍲 (Juane, Tacacho, Patarashca)</option>
                  <option>Mi Traje Típico 🪶 (Corona de semillas, Chambira)</option>
                  <option>Mi Baile Tradicional 💃 (Pandilla, Bombo Baile)</option>
                  <option>Mi Amor por Iquitos 🌴 (Río Amazonas, Malecón)</option>
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
                  placeholder="Ej: ¡Amo comer tacacho con mi familia y bailar la pandilla en San Juan! ¡Yo soy de Iquitos y nadie me quita mi orgullo!"
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
