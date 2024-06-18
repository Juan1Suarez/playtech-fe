"use client";
import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { verProductos } from '@/app/services/Producto';
import Producto from '../model/producto.model';
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function MainAdmin() {
    const [darkMode, setDarkMode] = useState(false);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [value, setValue] = useState<number | null>(5);

    useEffect(() => {
        verProductos().then((data: Producto[]) => {
            setProductos(data);
        }).catch(error => {
            console.error("Error fetching products:", error);
        });
    })

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("darkMode", !darkMode);
    };

    return (
        <>
            <img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img>
            
            <input className='navigation' placeholder='Buscar Producto'></input>
            <button className='buscar'><FaMagnifyingGlass /></button>
            <div className='adminuser'>User</div>
            <div className='fondodark'>
                <div>Dark mode</div>
                <Switch onChange={toggleDarkMode} checked={darkMode} className='switch' form="flexSwitchCheckChecked" />
            </div>
            <br></br>
            <h1 className='subs'>Auriculares</h1>
            <div className='fondoimg'>
                {productos
                .filter(producto => producto.tipoDeProducto === "Auriculares")
                .map(producto => (
                    <a key={producto.productoId}>
                      <img src={producto.foto} width={200} height={200}></img>
                      <p>{producto.modelo}</p>
                      <h1>{producto.precio}</h1>
                    </a>
                ))}
            </div>
            <br></br>
            <h1 className='subs'>Teclados</h1>
            <div className='fondoimg'>
                {productos
                .filter(producto => producto.tipoDeProducto === "Teclado")
                .map(producto => (
                    <a key={producto.productoId}>
                         <img src={producto.foto} width={200} height={200}></img>
                      <p>{producto.modelo}</p>
                        <h1>{producto.precio}</h1>
                    </a>
                ))}
            </div>
           <br></br>
            <h1 className='subs'>Mouses</h1>
            <div className='fondoimg'>
                {productos
                .filter(producto => producto.tipoDeProducto === "Mouse")
                .map(producto => (
                    <a key={producto.productoId}>
                 <img src={producto.foto} width={200} height={200}></img>
                      <p>{producto.modelo}</p>
                        <h1>{producto.precio}</h1>
                    </a>
                ))}
            </div>
            <br></br>
            <h1 className='subs'>Mousepads</h1>
            <div className='fondoimg'>
                {productos
                .filter(producto => producto.tipoDeProducto === "Mousepad")
                .map(producto => (
                    <a key={producto.productoId}>
                 <img src={producto.foto} width={200} height={200}></img>
                      <p>{producto.modelo}</p>
                        <h1>{producto.precio}</h1>
                    </a>
                ))}
            </div>
            <br></br>
            <h1 className='subs'>Sillas Gamers</h1>
            <div className='fondoimg'>
                {productos
                .filter(producto => producto.tipoDeProducto === "Silla Gamer")
                .map(producto => (
                    <a key={producto.productoId}>
                 <img src={producto.foto} width={200} height={200}></img>
                      <p>{producto.modelo}</p>
                        <h1>{producto.precio}</h1>
                    </a>
                ))}
            </div>
            
            
            <Box
                className='rating'
                sx={{
                    '& > legend': { mt: 2 },
                }}
            >
                <Typography component="legend">¡Deja tu opinión!</Typography>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                />
            </Box>
        </>
    );
}