"use client";
import React, { useEffect, useState } from 'react';
import 'rsuite/Dropdown/styles/index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/navigation"
import { UsardarkMode } from '@/app/services/DarkMode';

export default function   TerminosYCondiciones() {
    const { darkMode, activarDarkMode } = UsardarkMode();
    const router = useRouter();
    const navegarARegister = () => {
        router.push("register")
    }
    
    return (
        <>
           <img className="play" src='./img/imagen_2024-05-22_195807468-removebg-preview.png' alt="Main" />

            <button className='volver' onClick={() => navegarARegister()}>Volver</button>
            <button className='darkT' onClick={activarDarkMode} >Dark mode</button>

            <br></br><br></br><br></br><br></br><br></br><br></br>
            <div className='terminos'>
                <h1>Términos y Condiciones</h1>
                <br></br><br></br>
                <h3>Fecha de última actualización: 15 de julio de 2024</h3>
                <br></br><br></br>
                <h2>1. Aceptación de los Términos</h2>
                <h3>Al acceder y utilizar nuestro sitio web, aceptas cumplir y estar sujeto a los siguientes términos y condiciones. Si no estás de acuerdo con alguno de estos términos, te recomendamos que no utilices nuestro sitio web.</h3>
                <br></br>
                <h2>2. Uso del Sitio Web</h2>
                <h3>El acceso a nuestro sitio web está permitido de manera temporal y nos reservamos el derecho de retirar o modificar los servicios que ofrecemos sin previo aviso. No seremos responsables si por alguna razón nuestro sitio web no está disponible en algún momento o durante algún período.</h3>
                <br></br>
                <h2>3. Información del Producto</h2>
                <h3>Procuramos asegurar que toda la información sobre los productos disponibles en nuestro sitio web sea precisa y esté actualizada. Sin embargo, no garantizamos que las descripciones de los productos, precios u otros contenidos sean precisos, completos, fiables, actuales o libres de errores.</h3>
            </div>
        </>
    );
}