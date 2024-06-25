"use client";
import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import { verProductos } from '@/app/services/Producto';
import Producto from '../model/producto.model';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import {withRoles} from '@/app/services/HOC/withRoles';

const MainUser = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [productos, setProductos] = useState<Producto[]>([]);

    const router = useRouter();
    const navegarAProducto = (producto: Producto) => {
        sessionStorage.setItem('productoSeleccionado', JSON.stringify(producto));
        router.push("/producto");
    }
    
    useEffect(() => {
        verProductos().then((data: Producto[]) => {
            setProductos(data);
        })
    })

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
            <h1 className='subs'>Auriculares</h1>
            <div className='fondoimg'> 
                {productos
                .filter(producto => producto.tipoDeProducto === "Auriculares")
                .map(producto => (
                         <a key={producto.productoId}  onClick={() => navegarAProducto(producto)}>
                      <img src={producto.foto} width={200} height={200}></img>
                      <p>{producto.modelo}</p>
                      <h1>${producto.precio}</h1>
                    </a>
                ))}
            </div>
            <br></br>
            <h1 className='subs'>Teclados</h1>
            <div className='fondoimg'>
                {productos
                .filter(producto => producto.tipoDeProducto === "Teclado")
                .map(producto => (
                           <a key={producto.productoId}  onClick={() => navegarAProducto(producto)}>
                         <img src={producto.foto} width={200} height={200}></img>
                      <p>{producto.modelo}</p>
                        <h1>${producto.precio}$</h1>
                    </a>
                ))}
            </div>
           <br></br>
            <h1 className='subs'>Mouses</h1>
            <div className='fondoimg'>
                {productos
                .filter(producto => producto.tipoDeProducto === "Mouse")
                .map(producto => (
                   <a key={producto.productoId}  onClick={() => navegarAProducto(producto)}>
                 <img src={producto.foto} width={200} height={200}></img>
                      <p>{producto.modelo}</p>
                        <h1>${producto.precio}$</h1>
                    </a>
                ))}
            </div>
            <br></br>
            <h1 className='subs'>Mousepads</h1>
            <div className='fondoimg'>
                {productos
                .filter(producto => producto.tipoDeProducto === "Mousepad")
                .map(producto => (
                      <a key={producto.productoId}  onClick={() => navegarAProducto(producto)}>
                 <img src={producto.foto} width={200} height={200}></img>
                      <p>{producto.modelo}</p>
                        <h1>${producto.precio}$</h1>
                    </a>
                ))}
            </div>
            <br></br>
            <h1 className='subs'>Sillas Gamers</h1>
            <div className='fondoimg'>
                {productos
                .filter(producto => producto.tipoDeProducto === "Silla Gamer")
                .map(producto => (
                    <a key={producto.productoId}  onClick={() => navegarAProducto(producto)}>
                 <img src={producto.foto} width={200} height={200}></img>
                      <p>{producto.modelo}</p>
                        <h1>${producto.precio}</h1>
                    </a>
                ))}
            </div>
        </>
    );
}

export default withRoles(MainUser, [2], '/register');