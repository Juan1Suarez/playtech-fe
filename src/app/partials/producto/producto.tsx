"use client";
import React, { useState } from 'react';
import Switch from '@mui/material/Switch';;
import { useRouter } from "next/navigation"
import { FaMagnifyingGlass } from 'react-icons/fa6';



export default function Home() {

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("darkMode", !darkMode);
  };

  return (
    <>
      <img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img>

      <input className='navigation' placeholder='Buscar Producto'></input>
      <button className='buscar'><FaMagnifyingGlass /></button>
      <div className='adminuser'></div>
      <div className='fondodark'>
        <div>Dark mode</div>
        <Switch onChange={toggleDarkMode} checked={darkMode} className='switch' form="flexSwitchCheckChecked" />
      </div>
   <div className='nombreproducto'>Logitech G-series G435 inalambrico</div>
   <div className='precioproducto'>Precio: $250000</div>
   <div className="dropdown">
  <button className="dropbtn">Color:</button>
  <div className="dropdown-content">
    <a href="#">Negro</a>
    <a href="#">Blanco</a>
    <a href="#">Rojo</a>
  </div>
</div>
     
      <div className='productos'>
        <img src='./img/logitech.webp' className='fotoP'></img>
        <div className='productosComprar'></div>
      </div>
   
      <div className='productosDesc'>
        <h1 className='desc'>Descripción del producto</h1>
        <h2 className='productoNombre'>Auriculares Gamer HyperX Cloud Alpha :</h2>
        <p className='productoTexto'>Los HyperX Cloud Alpha son auriculares diseñados para gamers, ofreciendo una excelente calidad de sonido gracias a sus controladores duales que separan los graves de los agudos y medios. La estructura de aluminio duradera y las almohadillas de espuma con memoria aseguran comodidad durante largas sesiones de juego. El micrófono desmontable con cancelación de ruido permite una comunicación clara, y el cable trenzado extraíble incluye controles de audio en línea. Son compatibles con múltiples plataformas como PC, PS4 y Xbox One. Con su diseño elegante y funcionalidad avanzada, los HyperX Cloud Alpha son una opción ideal para jugadores serios.</p>
        <p className='productoTexto'>STOCK:</p>
        <p className='productoTexto'>PRECIO:</p>
        <p className='productoTexto'>MODELO:</p>
      </div>
    </>
  );
}