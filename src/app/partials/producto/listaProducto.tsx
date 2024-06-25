"use client";
import React, { useState } from 'react';
import Switch from '@mui/material/Switch';;
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { withRoles } from '@/app/services/HOC/withRoles';


const ListaProducto = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("darkMode", !darkMode);
    };

  return (
    <>
                <img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img>
            <div className="dropdown">
                <button className="navigation">¿Que tipo de producto esta buscando?</button>
                <div className="dropdown-content">
                    <a href="listaProducto">Auriculares</a>
                    <a href="listaProducto">Auriculares</a>
                    <a href="listaProducto">Auriculares</a>
                    <a href="listaProducto">Auriculares</a>
                    <a href="listaProducto">Auriculares</a>
                </div>
            </div>
            <button className='buscar'><FaMagnifyingGlass /></button>
            <div className='adminuser'>User</div>
            <div className='fondodark'>
                <div>Dark mode</div>
                <Switch onChange={toggleDarkMode} checked={darkMode} className='switch' form="flexSwitchCheckChecked" />
            </div>

            <div className='containerProductos'>
                <p className='productosListado'> -Auriculares</p>
                <p className='productosListado'> -Mousepad</p>
                <p className='productosListado'> -Monitores</p>
                <p className='productosListado'> -Teclados</p>
                <p className='productosListado'> -Sillas gamer</p>
                <p className='productosListado'> -Mouses</p>
                <p className='productosListado'> -Gabinetes</p>
                <p className='productosListado'> -Gabinetes</p>
                <p className='productosListado'> -Gabinetes</p>
                <p className='productosListado'> -Gabinetes</p>
            </div>

            <div className='buscadorProductos'>
                <div className='cardProducto'>Gabinete lol</div>
                <div className='cardProducto'>Gabinete lol</div>
                <div className='cardProducto'>Gabinete lol</div>
                <div className='cardProducto'>Gabinete lol</div>


            </div>
    </>
  );
}

export default withRoles(ListaProducto, [2], '/');