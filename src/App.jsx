import React, { useState } from 'react';
import { FRASES_TIPICAS } from './data/loretanoData';
import {
  DelfinRosado,
  Guacamayo,
  VictoriaRegia,
  Otorongo,
  Mototaxi,
  Paiche,
  FrutaAguaje,
  KeneDivider
} from './components/AmazonDrawings';
import { SoundAmbiance } from './components/SoundAmbiance';
import { Diccionario } from './components/Diccionario';
import { Gastronomia } from './components/Gastronomia';
import { Leyendas } from './components/Leyendas';
import { Lugares } from './components/Lugares';
import { Quiz } from './components/Quiz';
import './App.css';

export function App() {
  const [fraseActual, setFraseActual] = useState(FRASES_TIPICAS[0]);
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cambiarFrase = () => {
    const indiceAleatorio = Math.floor(Math.random() * FRASES_TIPICAS.length);
    setFraseActual(FRASES_TIPICAS[indiceAleatorio]);
  };

  const scrollTo = (id) => {
    setMenuAbierto(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="loretano-app">
      {/* Barra superior de navegación */}
      <header className="navbar-container">
        <div className="navbar-inner">
          <div className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="logo-icon-wrap">
              <DelfinRosado className="w-12 h-10" animated={false} />
            </div>
            <div className="logo-texts">
              <span className="brand-title">SOY LORETANO</span>
              <span className="brand-tagline">Iquitos • Amazonía del Perú</span>
            </div>
          </div>

          {/* Menú de enlaces */}
          <nav className={`nav-links ${menuAbierto ? 'open' : ''}`}>
            <button onClick={() => scrollTo('diccionario')} className="nav-item">
              <span className="nav-emoji">📖</span> Diccionario
            </button>
            <button onClick={() => scrollTo('gastronomia')} className="nav-item">
              <span className="nav-emoji">🍲</span> Comidas
            </button>
            <button onClick={() => scrollTo('leyendas')} className="nav-item">
              <span className="nav-emoji">✨</span> Leyendas
            </button>
            <button onClick={() => scrollTo('lugares')} className="nav-item">
              <span className="nav-emoji">📍</span> Lugares
            </button>
            <button onClick={() => scrollTo('quiz')} className="nav-item nav-highlight">
              <span className="nav-emoji">🎯</span> Test Charapa
            </button>
          </nav>

          {/* Controles de ambiente y menú móvil */}
          <div className="navbar-actions">
            <SoundAmbiance />
            <button
              className="mobile-toggle"
              onClick={() => setMenuAbierto(!menuAbierto)}
              aria-label="Alternar menú"
            >
              {menuAbierto ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Principal con Colores de la Selva */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-leaf">🌿</span>
            <span>Bienvenidos a la Tierra Caliente y Alegre</span>
            <span className="badge-pink-heart">💖</span>
          </div>

          <h1 className="hero-main-title">
            <span className="title-soy">SOY</span>{' '}
            <span className="title-loretano">LORETANO</span>
          </h1>

          <p className="hero-motto">
            “Si eres de Iquitos tienes que saber esto”
          </p>

          <p className="hero-subtext">
            Guía colorida de la cultura viva, gastronomía, expresiones charapas y leyendas
            mágicas de la perla del Amazonas peruano.
          </p>

          {/* Botones de acción rápida */}
          <div className="hero-cta-group">
            <button onClick={() => scrollTo('diccionario')} className="btn-hero-primary">
              🌴 Explorar Palabras Charapas
            </button>
            <button onClick={() => scrollTo('quiz')} className="btn-hero-secondary">
              🎯 ¿Qué tan Loretano eres?
            </button>
          </div>

          {/* Caja interactiva de frase típica loretana */}
          <div className="frase-box">
            <div className="frase-badge">🗣️ Frase del día:</div>
            <div className="frase-body">
              <h2 className="frase-text">{fraseActual.frase}</h2>
              <p className="frase-significado">{fraseActual.significado}</p>
            </div>
            <button onClick={cambiarFrase} className="btn-nueva-frase" title="Cambiar frase">
              🎲 ¡Otra frase, choche!
            </button>
          </div>
        </div>

        {/* Galería de dibujos amazónicos en el Hero */}
        <div className="hero-drawings-showcase">
          <div className="drawing-card card-delfin">
            <DelfinRosado className="w-32 h-28" />
            <span className="drawing-label">Bufeo Colorado</span>
          </div>
          <div className="drawing-card card-guacamayo">
            <Guacamayo className="w-28 h-32" />
            <span className="drawing-label">Guacamayo Escarlata</span>
          </div>
          <div className="drawing-card card-victoria">
            <VictoriaRegia className="w-32 h-24" />
            <span className="drawing-label">Victoria Regia</span>
          </div>
          <div className="drawing-card card-mototaxi">
            <Mototaxi className="w-32 h-24" />
            <span className="drawing-label">Mototaxi de Iquitos</span>
          </div>
        </div>
      </section>

      {/* Separador de arte Kené */}
      <KeneDivider />

      {/* Franja de datos rápidos loretanos */}
      <section className="facts-strip">
        <div className="fact-item">
          <span className="fact-icon">🚤</span>
          <div className="fact-info">
            <strong>Río Amazonas</strong>
            <span>El más caudaloso del mundo</span>
          </div>
        </div>
        <div className="fact-item">
          <span className="fact-icon">🛺</span>
          <div className="fact-info">
            <strong>Capital del Mototaxi</strong>
            <span>Cientos de miles en circulación</span>
          </div>
        </div>
        <div className="fact-item">
          <span className="fact-icon">🍃</span>
          <div className="fact-info">
            <strong>San Juan Bautista</strong>
            <span>El 24 de junio es fiesta total</span>
          </div>
        </div>
        <div className="fact-item">
          <span className="fact-icon">🌴</span>
          <div className="fact-info">
            <strong>Aguaje Sagrado</strong>
            <span>El fruto rey de Loreto</span>
          </div>
        </div>
      </section>

      {/* Sección 1: Diccionario Charapa */}
      <Diccionario />

      {/* Separador Kené */}
      <KeneDivider />

      {/* Sección 2: Gastronomía Loretana */}
      <Gastronomia />

      {/* Separador Kené */}
      <KeneDivider />

      {/* Sección 3: Mitos y Leyendas */}
      <Leyendas />

      {/* Separador Kené */}
      <KeneDivider />

      {/* Sección 4: Lugares de Iquitos */}
      <Lugares />

      {/* Separador Kené */}
      <KeneDivider />

      {/* Sección 5: Quiz Interactivo */}
      <Quiz />

      {/* Pie de página con ondas y colores de la selva */}
      <footer className="footer-loretano">
        <div className="footer-waves">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,40 L1200,120 L0,120 Z"
              fill="#064E3B"
            ></path>
          </svg>
        </div>

        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo-row">
              <DelfinRosado className="w-14 h-12" animated={false} />
              <h3>SOY LORETANO</h3>
            </div>
            <p className="footer-motto">“Si eres de Iquitos tienes que saber esto”</p>
            <p className="footer-copy">
              Creado con amor y orgullo por nuestra cultura amazónica. Dedicado a toda la
              gente linda de Iquitos, Nauta, Requena, Yurimaguas y todo Loreto.
            </p>
          </div>

          <div className="footer-links-col">
            <h4>Secciones</h4>
            <ul>
              <li><button onClick={() => scrollTo('diccionario')}>📖 Diccionario Charapa</button></li>
              <li><button onClick={() => scrollTo('gastronomia')}>🍲 Platos Típicos</button></li>
              <li><button onClick={() => scrollTo('leyendas')}>✨ Mitos y Leyendas</button></li>
              <li><button onClick={() => scrollTo('lugares')}>📍 Lugares de Iquitos</button></li>
              <li><button onClick={() => scrollTo('quiz')}>🎯 Test de Loreteñidad</button></li>
            </ul>
          </div>

          <div className="footer-colors-palette">
            <h4>Nuestros Colores de la Selva</h4>
            <div className="palette-pills">
              <span className="pill-color color-verde">Verde Selva</span>
              <span className="pill-color color-amarillo">Amarillo Aguaje</span>
              <span className="pill-color color-marron">Marrón Tierra</span>
              <span className="pill-color color-rosado">Rosado Delfín</span>
            </div>
            <div className="footer-quote">
              “¡Iquitos, te llevo en el corazón y en el sabor del juane!” 🌿💖
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SOY LORETANO • Las chicas del futuro • Loreto - Perú</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
