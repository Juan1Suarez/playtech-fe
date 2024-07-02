"use client";
import React from 'react';



export default function Footer() {
  return (
    <>   
    <br></br>
    <br></br>
     <footer>
    <div className="footerContainer">
        <div className="footer">
            <h3>Sobre Nosotros:</h3>
            <p>¡Bienvenido a Play-Tech sitio web donde puedes conseguir todos tus perifericos favoritos con envio a todo el país!</p>
        </div>
        <div className="footer">
            <h3>Siguenos en :</h3>
            <p>https://www.instagram.com/@PlayTech</p>
            <p>https://www.youtube.com/@Play-tech</p>
            <p>https://www.tiktok.com/@Play-tech</p>
        </div>
        <div className="footer">
            <h3>Contacto :</h3>
            <p>Email: playtech@gmail.com</p>
            <p>Teléfono: +54 2284 204928 </p>
            <p>Sucursal: Avenida Pringles 2800, Olavarría</p>
        </div>
    </div>
    <div className="footerCopy">
        <p>&copy; 2024 Playtech. Todos los derechos reservados.</p>
    </div>
</footer>
    </>
  );
}