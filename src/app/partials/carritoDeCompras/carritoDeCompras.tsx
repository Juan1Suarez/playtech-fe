"use client";
import { withRoles } from '@/app/services/HOC/withRoles';
import Switch from '@mui/material/Switch';
import React, { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const CarritoDeCompras = () => {

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("darkMode", !darkMode);
  };
  
  return (
    <>
    <a href='mainUser'><img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img></a>

<input className='navigation' placeholder='Buscar Producto'></input>
<button className='buscar'><FaMagnifyingGlass /></button>
<div className='adminuser'>User</div>
<div className='fondodark'>
  <div>Dark mode</div>
  <Switch onChange={toggleDarkMode} checked={darkMode} className='switch' form="flexSwitchCheckChecked" />
</div>


    <div className='carritoProducto'>
      
      <div className='comprarProducto'>
        <div className='productoElegido'>
        </div>
        <div className='fin'>Finalizar transacción</div>
      </div>
    </div>

  
    </>
  );
}

export default withRoles(CarritoDeCompras, [2], '/');