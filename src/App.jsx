import React, { useState } from 'react';
import { DelfinRosado, KeneDivider } from './components/AmazonDrawings';
import { SoundAmbiance } from './components/SoundAmbiance';
import { Inicio } from './components/Inicio';
import { CuentosSelva } from './components/CuentosSelva';
import { RecetasLoretanas } from './components/RecetasLoretanas';
import { JuegoLoreto } from './components/JuegoLoreto';
import { YoSoyLoretano } from './components/YoSoyLoretano';
import { FeriaYReto } from './components/FeriaYReto';
import './App.css';

export function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const scrollTo = (id) => {
    setMenuAbierto(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="loretano-app">
      {/* Barra de Navegación Superior */}
      <header className="navbar-container">
        <div className="navbar-inner">
          <div className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="logo-icon-wrap">
              <DelfinRosado className="w-12 h-10" animated={false} />
            </div>
            <div className="logo-texts">
              <span className="brand-title">SOY LORETANO</span>
              <span className="brand-tagline">“¡Yo soy de Iquitos!”</span>
            </div>
          </div>

          {/* Menú con las 5 Secciones Principales */}
          <nav className={`nav-links ${menuAbierto ? 'open' : ''}`}>
            <button onClick={() => scrollTo('inicio')} className="nav-item">
              🏠 Inicio
            </button>
            <button onClick={() => scrollTo('cuentos')} className="nav-item">
              👵🏼 Cuentos de la Selva
            </button>
            <button onClick={() => scrollTo('recetas')} className="nav-item">
              🍲 Recetas Paso a Paso
            </button>
            <button onClick={() => scrollTo('juego')} className="nav-item nav-highlight">
              🎮 Juego & Puntos
            </button>
            <button onClick={() => scrollTo('yo-soy-loretano')} className="nav-item nav-orgullo">
              📸 Yo Soy Loretano
            </button>
            <button onClick={() => scrollTo('iniciativas')} className="nav-item">
              🏫 Feria & Reto
            </button>
          </nav>

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

      {/* 1. SECCIÓN INICIO: Bienvenida grande con foto y lema */}
      <Inicio
        onExplorar={() => scrollTo('cuentos')}
        onJugar={() => scrollTo('juego')}
      />

      {/* Cenefa Kené Amazónica */}
      <KeneDivider />

      {/* 2. SECCIÓN CUENTOS DE LA SELVA: Contados por abuelitos (El Chullachaqui y El Yacuruna) */}
      <CuentosSelva />

      {/* Cenefa Kené Amazónica */}
      <KeneDivider />

      {/* 3. SECCIÓN RECETAS LORETANAS: Paso a paso de Juane, Tacacho y Patarashca */}
      <RecetasLoretanas />

      {/* Cenefa Kené Amazónica */}
      <KeneDivider />

      {/* 4. SECCIÓN JUEGO: ¿Cuánto sabes de Loreto? Con puntos y niveles */}
      <JuegoLoreto />

      {/* Cenefa Kené Amazónica */}
      <KeneDivider />

      {/* 5. SECCIÓN YO SOY LORETANO: Espacio para subir foto de comida, traje o baile */}
      <YoSoyLoretano />

      {/* Cenefa Kené Amazónica */}
      <KeneDivider />

      {/* SECCIÓN ESPECIAL: Feria "Día Loretano" en el colegio y "Domingo sin celular" */}
      <FeriaYReto />

      {/* Pie de Página Loretano */}
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
              Proyecto creado para que la juventud de Iquitos recupere el amor y orgullo
              por sus cuentos ancestrales, sus comidas tradicionales, sus danzas y su identidad amazónica.
              <strong> ¡Di siempre con el corazón: Yo soy de Iquitos!</strong>
            </p>
          </div>

          <div className="footer-links-col">
            <h4>Las 5 Secciones</h4>
            <ul>
              <li><button onClick={() => scrollTo('inicio')}>1. Inicio: ¡Yo soy de Iquitos!</button></li>
              <li><button onClick={() => scrollTo('cuentos')}>2. Cuentos de los Abuelitos</button></li>
              <li><button onClick={() => scrollTo('recetas')}>3. Recetas Paso a Paso</button></li>
              <li><button onClick={() => scrollTo('juego')}>4. Juego: ¿Cuánto Sabes?</button></li>
              <li><button onClick={() => scrollTo('yo-soy-loretano')}>5. Muro: Yo Soy Loretano</button></li>
              <li><button onClick={() => scrollTo('iniciativas')}>• Feria y Domingo sin Celular</button></li>
            </ul>
          </div>

          <div className="footer-colors-palette">
            <h4>Colores de Nuestra Selva</h4>
            <div className="palette-pills">
              <span className="pill-color color-verde">Verde Selva</span>
              <span className="pill-color color-amarillo">Amarillo Aguaje</span>
              <span className="pill-color color-marron">Marrón Tierra</span>
              <span className="pill-color color-rosado">Rosado Bufeo</span>
            </div>
            <div className="footer-quote">
              “Nuestra cultura no da vergüenza, ¡nuestra cultura es pura grandeza!” 🌿💖
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} SOY LORETANO • Las chicas del futuro • Iquitos, Loreto, Perú</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
