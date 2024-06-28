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
      <img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img>

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