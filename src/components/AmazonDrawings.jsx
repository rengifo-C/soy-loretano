import React from 'react';

/**
 * Ilustraciones y Dibujos Amazónicos originales en SVG
 * Colores de la selva: Verde, Amarillo, Marrón y Rosado
 */

// 1. Delfín Rosado del Amazonas (Bufeo Colorado)
export function DelfinRosado({ className = "w-24 h-24", animated = true }) {
  return (
    <svg viewBox="0 0 200 160" className={`amazon-svg ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pinkDolphinGrad" x1="20" y1="20" x2="180" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFA6C9" />
          <stop offset="50%" stopColor="#FF66A1" />
          <stop offset="100%" stopColor="#D81B60" />
        </linearGradient>
        <linearGradient id="riverWaveGrad" x1="0" y1="120" x2="200" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0288D1" />
          <stop offset="50%" stopColor="#00ACC1" />
          <stop offset="100%" stopColor="#26A69A" />
        </linearGradient>
      </defs>

      {/* Olas del Río Amazonas */}
      <path
        d="M0 130 C30 115 60 145 100 130 C140 115 170 140 200 130 L200 160 L0 160 Z"
        fill="url(#riverWaveGrad)"
        opacity="0.8"
      />
      <path
        d="M10 140 C45 125 75 148 115 135 C155 122 185 142 200 138"
        stroke="#E0F7FA"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Gotitas de agua */}
      <circle cx="150" cy="55" r="4" fill="#80DEEA" />
      <circle cx="165" cy="45" r="3" fill="#B2EBF2" />
      <circle cx="140" cy="35" r="2.5" fill="#E0F7FA" />

      {/* Cuerpo del Delfín Rosado saltando */}
      <g className={animated ? "animate-dolphin" : ""}>
        {/* Aleta caudal (cola) */}
        <path
          d="M32 98 C18 80 8 85 10 95 C14 105 28 110 38 108 C30 116 18 126 12 120 C8 115 16 102 30 102"
          fill="url(#pinkDolphinGrad)"
        />
        {/* Cuerpo principal curvado */}
        <path
          d="M35 104 C55 80 85 45 130 50 C165 54 185 75 175 88 C168 95 152 92 140 85 C110 75 80 98 45 110 C38 112 34 108 35 104 Z"
          fill="url(#pinkDolphinGrad)"
        />
        {/* Hocico largo característico del delfín de río */}
        <path
          d="M168 76 C182 78 196 82 198 86 C196 89 180 90 166 87 Z"
          fill="#FF85B3"
        />
        {/* Aleta dorsal baja y alargada */}
        <path
          d="M92 48 C102 40 115 42 122 51 C110 52 100 50 92 48 Z"
          fill="#E91E63"
        />
        {/* Aleta pectoral */}
        <path
          d="M115 80 C125 95 135 108 126 112 C118 115 112 98 108 85 Z"
          fill="#F06292"
        />
        {/* Vientre más claro */}
        <path
          d="M75 92 C100 82 130 78 152 86 C138 90 105 98 75 92 Z"
          fill="#FFD1E3"
          opacity="0.7"
        />
        {/* Ojo vivaz y simpático */}
        <circle cx="156" cy="73" r="3.5" fill="#4A154B" />
        <circle cx="157" cy="72" r="1.2" fill="#FFFFFF" />
        {/* Sonrisa amazónica */}
        <path d="M164 82 Q172 84 180 84" stroke="#880E4F" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 2. Guacamayo Escarlata (Papagayo Amazónico)
export function Guacamayo({ className = "w-24 h-24" }) {
  return (
    <svg viewBox="0 0 160 200" className={`amazon-svg ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rama de árbol de la selva (marrón cálido) */}
      <path
        d="M20 165 C50 155 110 160 155 150 C140 165 90 170 20 175 Z"
        fill="#6D4C41"
      />
      {/* Hojitas verdes en la rama */}
      <path d="M130 152 C145 140 155 148 150 160 C140 162 132 158 130 152 Z" fill="#2E7D32" />
      <path d="M115 160 C128 168 132 178 122 180 C114 178 112 170 115 160 Z" fill="#43A047" />

      {/* Cola larga tricolor (rojo, amarillo, azul) */}
      <path d="M68 135 C64 165 58 190 52 200 C58 185 70 160 76 135 Z" fill="#D32F2F" />
      <path d="M72 135 C70 160 68 185 64 195 C68 175 76 155 80 135 Z" fill="#FBC02D" />
      <path d="M78 135 C78 155 82 175 80 185 C84 170 86 150 84 135 Z" fill="#1976D2" />

      {/* Cuerpo rojo brillante */}
      <path
        d="M55 75 C55 50 75 35 95 38 C115 42 120 65 115 95 C110 120 95 140 75 140 C60 138 55 105 55 75 Z"
        fill="#E53935"
      />

      {/* Ala con degradado amazónico: Rojo -> Amarillo -> Verde -> Azul */}
      {/* Plumas rojas superiores */}
      <path d="M75 70 C88 65 102 75 100 95 C90 98 78 88 75 70 Z" fill="#C62828" />
      {/* Franja amarilla */}
      <path d="M78 88 C92 84 102 96 98 108 C86 110 78 100 78 88 Z" fill="#FFD54F" />
      {/* Franja verde selva */}
      <path d="M76 102 C88 100 96 110 92 120 C82 120 76 112 76 102 Z" fill="#4CAF50" />
      {/* Puntas azules */}
      <path d="M74 115 C84 116 88 128 84 135 C76 132 72 124 74 115 Z" fill="#0288D1" />

      {/* Parche blanco en la mejilla característico */}
      <path d="M96 46 C105 48 112 55 108 64 C100 68 94 60 96 46 Z" fill="#FFFDE7" />

      {/* Pico curvo de guacamayo */}
      {/* Parte superior marfil */}
      <path d="M106 50 C116 52 125 58 124 66 C116 67 110 60 106 50 Z" fill="#FFF9C4" stroke="#4E342E" strokeWidth="1" />
      {/* Mandíbula inferior oscura */}
      <path d="M108 64 C114 65 116 70 112 72 C108 72 106 67 108 64 Z" fill="#3E2723" />

      {/* Ojo dorado */}
      <circle cx="102" cy="54" r="3" fill="#F57F17" />
      <circle cx="102.5" cy="53.5" r="1.5" fill="#212121" />

      {/* Patitas agarradas a la rama */}
      <rect x="68" y="152" width="6" height="10" rx="3" fill="#424242" />
      <rect x="78" y="152" width="6" height="10" rx="3" fill="#424242" />
    </svg>
  );
}

// 3. Victoria Regia (Lirio Gigante del Amazonas)
export function VictoriaRegia({ className = "w-24 h-24" }) {
  return (
    <svg viewBox="0 0 180 140" className={`amazon-svg ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="victoriaLeafGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#81C784" />
          <stop offset="70%" stopColor="#2E7D32" />
          <stop offset="100%" stopColor="#1B5E20" />
        </radialGradient>
        <linearGradient id="flowerPinkGrad" x1="90" y1="30" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F8BBD0" />
          <stop offset="100%" stopColor="#EC407A" />
        </linearGradient>
      </defs>

      {/* Agua de cocha amazónica */}
      <ellipse cx="90" cy="115" rx="85" ry="20" fill="#00695C" opacity="0.3" />

      {/* Hoja circular gigante con borde elevado característico */}
      <ellipse cx="90" cy="95" rx="78" ry="32" fill="#558B2F" stroke="#33691E" strokeWidth="4" />
      <ellipse cx="90" cy="94" rx="73" ry="28" fill="url(#victoriaLeafGrad)" />

      {/* Nervaduras de la hoja de Victoria Regia */}
      <path d="M90 94 L30 85 M90 94 L50 75 M90 94 L90 68 M90 94 L130 75 M90 94 L150 85 M90 94 L145 105 M90 94 L120 115 M90 94 L90 120 M90 94 L60 115 M90 94 L35 105"
        stroke="#A5D6A7" strokeWidth="1.5" strokeOpacity="0.6" />

      {/* Corte o ranura de drenaje característica */}
      <path d="M90 94 L90 126" stroke="#1B5E20" strokeWidth="3" />

      {/* Flor abierta de Victoria Regia en el centro */}
      {/* Pétalos exteriores blancos y rosados */}
      <path d="M90 40 C75 55 78 75 90 80 C102 75 105 55 90 40 Z" fill="url(#flowerPinkGrad)" />
      <path d="M70 50 C62 65 72 80 85 82 C88 72 80 58 70 50 Z" fill="url(#flowerPinkGrad)" />
      <path d="M110 50 C118 65 108 80 95 82 C92 72 100 58 110 50 Z" fill="url(#flowerPinkGrad)" />
      <path d="M58 65 C55 80 70 90 84 86 C82 76 68 68 58 65 Z" fill="#F48FB1" />
      <path d="M122 65 C125 80 110 90 96 86 C98 76 112 68 122 65 Z" fill="#F48FB1" />

      {/* Centro dorado de la flor */}
      <circle cx="90" cy="74" r="8" fill="#FDD835" />
      <circle cx="90" cy="74" r="5" fill="#F57F17" />
    </svg>
  );
}

// 4. Mototaxi de Iquitos (Icono del transporte loretano)
export function Mototaxi({ className = "w-28 h-24" }) {
  return (
    <svg viewBox="0 0 200 140" className={`amazon-svg ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="toldoGrad" x1="40" y1="20" x2="160" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E91E63" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>

      {/* Sombra en el asfalto */}
      <ellipse cx="100" cy="128" rx="80" ry="8" fill="#2D3748" opacity="0.3" />

      {/* Estructura trasera y carrocería */}
      <rect x="50" y="55" width="85" height="42" rx="8" fill="#1E88E5" />
      <rect x="55" y="60" width="75" height="25" rx="4" fill="#BBDEFB" opacity="0.7" />

      {/* Rayas decorativas típicas de mototaxi iquiteño */}
      <path d="M50 82 H135" stroke="#FDD835" strokeWidth="4" />
      <path d="M50 88 H135" stroke="#E53935" strokeWidth="3" />

      {/* Toldo colorido arriba con flecos festivos */}
      <path
        d="M38 32 C50 25 150 25 165 32 L162 48 C150 44 48 44 40 48 Z"
        fill="url(#toldoGrad)"
      />
      {/* Flequillos decorativos del toldo */}
      <circle cx="48" cy="48" r="3" fill="#FDD835" />
      <circle cx="68" cy="48" r="3" fill="#E91E63" />
      <circle cx="88" cy="48" r="3" fill="#26A69A" />
      <circle cx="108" cy="48" r="3" fill="#FDD835" />
      <circle cx="128" cy="48" r="3" fill="#E91E63" />
      <circle cx="148" cy="48" r="3" fill="#26A69A" />

      {/* Parantes metálicos de soporte */}
      <line x1="48" y1="36" x2="52" y2="95" stroke="#90A4AE" strokeWidth="3" strokeLinecap="round" />
      <line x1="130" y1="36" x2="132" y2="95" stroke="#90A4AE" strokeWidth="3" strokeLinecap="round" />
      <line x1="155" y1="34" x2="152" y2="85" stroke="#90A4AE" strokeWidth="3" strokeLinecap="round" />

      {/* Manubrio / Timón de moto adelante */}
      <path d="M140 75 L165 78 L155 105" stroke="#37474F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="165" cy="78" r="4" fill="#F57F17" /> {/* Espejo / Puño */}

      {/* Faro delantero encendido */}
      <path d="M168 85 L185 80 L185 96 L168 91 Z" fill="#FFF9C4" opacity="0.6" />
      <circle cx="168" cy="88" r="5" fill="#FFEE58" stroke="#F57F17" strokeWidth="1.5" />

      {/* Rueda delantera */}
      <circle cx="155" cy="112" r="16" fill="#263238" />
      <circle cx="155" cy="112" r="10" fill="#90A4AE" />
      <circle cx="155" cy="112" r="4" fill="#37474F" />

      {/* Ruedas traseras */}
      <circle cx="68" cy="114" r="18" fill="#263238" />
      <circle cx="68" cy="114" r="11" fill="#90A4AE" />
      <circle cx="68" cy="114" r="4" fill="#37474F" />

      {/* Placa Iquitos / Loreto */}
      <rect x="42" y="85" width="16" height="10" rx="2" fill="#FFFFFF" stroke="#000" strokeWidth="1" />
      <text x="50" y="92" fontSize="5" fontWeight="bold" textAnchor="middle" fill="#000">IQT</text>
    </svg>
  );
}

// 5. Otorongo / Jaguar de la Selva
export function Otorongo({ className = "w-24 h-24" }) {
  return (
    <svg viewBox="0 0 150 150" className={`amazon-svg ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cabeza dorada del otorongo */}
      <circle cx="75" cy="75" r="46" fill="#F59E0B" />

      {/* Orejas alertas */}
      <path d="M40 45 C32 25 50 20 60 38 Z" fill="#D97706" />
      <path d="M44 40 C38 28 48 26 55 37 Z" fill="#FDE68A" />
      <path d="M110 45 C118 25 100 20 90 38 Z" fill="#D97706" />
      <path d="M106 40 C112 28 102 26 95 37 Z" fill="#FDE68A" />

      {/* Manchas o rosetas típicas del jaguar amazónico */}
      {/* Frente */}
      <circle cx="75" cy="45" r="3" fill="#451A03" />
      <circle cx="68" cy="50" r="2.5" fill="#451A03" />
      <circle cx="82" cy="50" r="2.5" fill="#451A03" />

      {/* Mejillas con rosetas */}
      <path d="M42 68 C40 64 45 60 48 62 C50 65 48 70 44 70" stroke="#451A03" strokeWidth="3" fill="none" />
      <circle cx="45" cy="65" r="2" fill="#B45309" />

      <path d="M108 68 C110 64 105 60 102 62 C100 65 102 70 106 70" stroke="#451A03" strokeWidth="3" fill="none" />
      <circle cx="105" cy="65" r="2" fill="#B45309" />

      {/* Hocico claro */}
      <ellipse cx="75" cy="90" rx="22" ry="16" fill="#FEF3C7" />
      {/* Nariz rosa/marrón */}
      <path d="M70 82 Q75 80 80 82 Q75 89 70 82 Z" fill="#78350F" />
      {/* Boca */}
      <path d="M75 87 L75 96 M75 96 Q68 102 64 96 M75 96 Q82 102 86 96" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

      {/* Bigotes */}
      <line x1="55" y1="90" x2="30" y2="88" stroke="#451A03" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="55" y1="94" x2="32" y2="98" stroke="#451A03" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="95" y1="90" x2="120" y2="88" stroke="#451A03" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="95" y1="94" x2="118" y2="98" stroke="#451A03" strokeWidth="1.5" strokeLinecap="round" />

      {/* Ojos felinos verdes de la selva */}
      <ellipse cx="60" cy="70" rx="7" ry="9" fill="#10B981" />
      <ellipse cx="60" cy="70" rx="2.5" ry="7" fill="#064E3B" />
      <circle cx="58" cy="67" r="1.5" fill="#FFFFFF" />

      <ellipse cx="90" cy="70" rx="7" ry="9" fill="#10B981" />
      <ellipse cx="90" cy="70" rx="2.5" ry="7" fill="#064E3B" />
      <circle cx="88" cy="67" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

// 6. Paiche Gigante (El pez colosal del Amazonas)
export function Paiche({ className = "w-28 h-20" }) {
  return (
    <svg viewBox="0 0 200 90" className={`amazon-svg ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="paicheGrad" x1="10" y1="45" x2="190" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4B5563" />
          <stop offset="40%" stopColor="#374151" />
          <stop offset="75%" stopColor="#B91C1C" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
      </defs>

      {/* Cola ancha con tonos rojizos característicos del paiche */}
      <path d="M170 45 C185 28 195 25 198 35 C196 45 194 48 198 55 C195 65 185 62 170 45 Z" fill="#DC2626" />

      {/* Aleta anal y dorsal largas hacia la cola */}
      <path d="M125 28 C145 25 168 32 172 38 C160 38 135 34 125 28 Z" fill="#991B1B" />
      <path d="M125 62 C145 65 168 58 172 52 C160 52 135 56 125 62 Z" fill="#991B1B" />

      {/* Cuerpo cilíndrico robusto */}
      <path
        d="M20 48 C40 32 90 28 150 32 C172 35 174 55 150 58 C90 62 40 58 20 48 Z"
        fill="url(#paicheGrad)"
      />

      {/* Escamas grandes con ribetes rojos (típico del Pirarucú / Paiche) */}
      <path d="M100 38 Q108 45 100 52" stroke="#F87171" strokeWidth="2" strokeLinecap="round" />
      <path d="M115 36 Q123 45 115 54" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M130 36 Q138 45 130 54" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
      <path d="M145 37 Q153 45 145 53" stroke="#B91C1C" strokeWidth="3" strokeLinecap="round" />

      {/* Cabeza ósea y aplanada */}
      <path d="M12 48 C16 42 28 40 38 42 C36 50 34 54 28 55 C18 54 12 50 12 48 Z" fill="#374151" />

      {/* Ojo pequeño */}
      <circle cx="24" cy="44" r="2.5" fill="#F59E0B" />
      <circle cx="24" cy="44" r="1.2" fill="#000" />

      {/* Aleta pectoral */}
      <path d="M45 52 C50 62 58 66 54 68 C48 68 44 60 45 52 Z" fill="#4B5563" />
    </svg>
  );
}

// 7. Fruta de Aguaje (El fruto emblemático)
export function FrutaAguaje({ className = "w-16 h-16" }) {
  return (
    <svg viewBox="0 0 100 100" className={`amazon-svg ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tallo */}
      <path d="M50 12 C48 20 52 24 50 28" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" />

      {/* Fruto con cáscara escamosa marrón rojiza */}
      <ellipse cx="50" cy="58" rx="34" ry="38" fill="#78350F" stroke="#5B21B6" strokeWidth="0" />

      {/* Trama de escamas del aguaje */}
      <path d="M25 50 Q35 42 50 42 Q65 42 75 50" stroke="#9A3412" strokeWidth="2" fill="none" />
      <path d="M20 60 Q35 52 50 52 Q65 52 80 60" stroke="#B45309" strokeWidth="2" fill="none" />
      <path d="M22 70 Q35 64 50 64 Q65 64 78 70" stroke="#9A3412" strokeWidth="2" fill="none" />
      <path d="M28 80 Q38 75 50 75 Q62 75 72 80" stroke="#78350F" strokeWidth="2" fill="none" />

      {/* Pulpa amarilla visible (gajo) */}
      <path d="M50 35 C65 45 68 70 52 88 C40 82 35 60 50 35 Z" fill="#F59E0B" opacity="0.4" />
    </svg>
  );
}

// 8. Patrón Kené / Amazónico decorativo (Separador de secciones)
export function KeneDivider() {
  return (
    <div className="kene-divider-wrapper" role="presentation">
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="kene-divider-svg">
        <defs>
          <pattern id="kenePattern" width="60" height="40" patternUnits="userSpaceOnUse">
            {/* Patrón geométrico estilo arte Kené con Verde, Amarillo, Marrón y Rosado */}
            <path d="M0 20 L15 5 L30 20 L45 35 L60 20" stroke="#10B981" strokeWidth="2.5" fill="none" />
            <path d="M15 5 L30 5 L45 20 L30 35 L15 35" stroke="#F59E0B" strokeWidth="2" fill="none" />
            <path d="M30 12 L38 20 L30 28 L22 20 Z" fill="#EC4899" />
            <circle cx="7.5" cy="20" r="2" fill="#78350F" />
            <circle cx="52.5" cy="20" r="2" fill="#78350F" />
          </pattern>
        </defs>
        <rect width="100%" height="40" fill="url(#kenePattern)" />
      </svg>
    </div>
  );
}
