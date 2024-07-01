"use client";
import { withRoles } from '@/app/services/HOC/withRoles';
import Switch from '@mui/material/Switch';
import React, { useState } from 'react';
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';

const CarritoDeCompras = () => {

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("darkMode", !darkMode);
  };

  return (
    <>
      <a href='mainUser'><img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img></a>

      <Container className='caidaproductos'>
        <Dropdown title="¿Que tipo de producto estas buscando?" size="lg" >
          <Dropdown.Item><a href="listaProducto">Auriculares</a></Dropdown.Item>
          <Dropdown.Item><a href="listaProducto">Teclados</a></Dropdown.Item>
          <Dropdown.Item><a href="listaProducto">Mouses</a></Dropdown.Item>
          <Dropdown.Item><a href="listaProducto">Mousepads</a></Dropdown.Item>
          <Dropdown.Item><a href="listaProducto">Sillas</a></Dropdown.Item>
        </Dropdown>
      </Container>
      <div className='adminuser'>User</div>
      <div className='fondodark'>
        <div>Dark mode</div>
        <Switch onChange={toggleDarkMode} checked={darkMode} className='switch' form="flexSwitchCheckChecked" />
      </div>


      <div className='carritoProducto'>

        <div className='productoElegido'>
          <img className='fotonisuta' src='./img/nisuta.webp' />
          <h1 className='textoProducto'>Turtle Beach Stealth 600 Gen 2</h1>
          <h1 className='valorproducto'>$78654.99</h1>
        </div>

        <div className='productoElegido'>
          <img className='fotonisuta' src='./img/nisuta.webp' />
          <h1 className='textoProducto'>Turtle Beach Stealth 600 Gen 2</h1>
          <h1 className='valorproducto'>$78654.99</h1>
        </div>

        <div className='productoElegido'>
          <img className='fotonisuta' src='./img/nisuta.webp' />
          <h1 className='textoProducto'>Turtle Beach Stealth 600 Gen 2</h1>
          <h1 className='valorproducto'>$78654.99</h1>
        </div>
        <div className='divisor'></div>
      </div>
      
 <div className='comprarProducto'>
          <div className='nombreEnLista'>Turtle Beach Stealth 600 Gen 2</div>
          <div className='nombreEnLista'>Turtle Beach Stealth 600 Gen 2</div>
          <div className='divisor1' />
          <h1 className='precioTotal'>Precio total = $78654.99</h1>
          <div className='fin'>Finalizar transacción</div>
        </div>

    </>
  );
}

export default withRoles(CarritoDeCompras, [2], '/');