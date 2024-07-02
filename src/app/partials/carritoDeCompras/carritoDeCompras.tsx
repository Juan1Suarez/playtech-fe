"use client";
import { withRoles } from '@/app/services/HOC/withRoles';
import Switch from '@mui/material/Switch';
import React, { useEffect, useState } from 'react';
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';
import Producto from '../model/producto.model';

const CarritoDeCompras = () => {
  const [producto, setProducto] = useState<Producto | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("darkMode", !darkMode);
  };

  useEffect(() => {
    const storedProducto = localStorage.getItem('carrodecompras');
    if (storedProducto) {
      const productoRecuperado: Producto = JSON.parse(storedProducto);
      setProducto(productoRecuperado);
    }
  }, []);

  return (
    <>
      <a href='mainUser'><img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img></a>

      <Container className='caidaproductos'>
      <Dropdown title="¿Qué tipo de producto estás buscando?" size="lg">
        <Dropdown.Item as="a" href="listaProducto?tipo=Auriculares">Auriculares</Dropdown.Item>
        <Dropdown.Item as="a" href="listaProducto?tipo=Teclado">Teclados</Dropdown.Item>
        <Dropdown.Item as="a" href="listaProducto?tipo=Mouse">Mouses</Dropdown.Item>
        <Dropdown.Item as="a" href="listaProducto?tipo=Mousepad">Mousepads</Dropdown.Item>
        <Dropdown.Item as="a" href="listaProducto?tipo=Silla%20Gamer">Sillas</Dropdown.Item>
      </Dropdown>
    </Container>
    
      <div className='adminuser'>User</div>
      <div className='fondodark'>
        <div>Dark mode</div>
        <Switch onChange={toggleDarkMode} checked={darkMode} className='switch' form="flexSwitchCheckChecked" />
      </div>


      <div className='carritoProducto'>

        <div className='productoElegido'>
          <img className='fotonisuta' src={producto?.foto} />
          <h1 className='textoProducto'>{producto?.modelo}</h1>
          <h1 className='valorproducto'>$ {producto?.precio}</h1>
        </div>
        <div className='divisor'></div>
      </div>
      
 <div className='comprarProducto'>
          <div className='nombreEnLista'>{producto?.modelo}</div>
          <div className='divisor1' />
          <h1 className='precioTotal'>Precio total = ${producto?.precio}</h1>
          <div className='fin'>Finalizar transacción</div>
        </div>

    </>
  );
}

export default withRoles(CarritoDeCompras, [2], '/');