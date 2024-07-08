"use client";
import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import { verProductos } from '@/app/services/Producto';
import Producto from '../../services/model/producto.model';
import { useRouter } from 'next/navigation';
import Slider from "react-slick";
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaUserGear } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";

export default function Home() {
    const [darkMode, setDarkMode] = useState(false);
    const [productos, setProductos] = useState<Producto[]>([]);

    const router = useRouter();
    const navegarALogin = () => {
        router.push("/login");
    }
    

    useEffect(() => {
        verProductos().then((data: Producto[]) => {
            setProductos(data);
        });
    }, []);

   

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    
    return (
        <>
            <img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png' alt="Main" />

            <Container className='caidaproductos'>
                <Dropdown title="¿Qué tipo de producto estás buscando?" size="lg">
                    <Dropdown.Item as="a" href="login">Auriculares</Dropdown.Item>
                    <Dropdown.Item as="a" href="login">Teclados</Dropdown.Item>
                    <Dropdown.Item as="a" href="login">Mouses</Dropdown.Item>
                    <Dropdown.Item as="a" href="login">Mousepads</Dropdown.Item>
                    <Dropdown.Item as="a" href="login">Sillas</Dropdown.Item>
                </Dropdown>
            </Container>

            <button className='logoCarrito' onClick={() => { navegarALogin() }}><TiShoppingCart size={42}/></button>

            <button onClick={() => navegarALogin()} className='ini'>Iniciar sesión</button>
            
            

            <Slider {...settings}>
                <div>
                    <img src="./img/1.png" style={{ width: '100%'}} />
                </div>
                <div>
                    <img src="./img/2.png" style={{ width: '100%' }} />
                </div>
                <div>
                    <img src="./img/3.png" style={{ width: '100%' }} />
                </div>
            </Slider>

            <h1 className='subs'>Auriculares</h1>
            <div className='fondoimg'>
                {productos
                    .filter(producto => producto.tipoDeProducto === "Auriculares")
                    .slice(0, 7)
                    .map(producto => (
                        <a key={producto.productoId} onClick={() => navegarALogin()}>
                            <img src={producto.foto} width={200} height={200} alt={producto.modelo} />
                            <p>{producto.modelo}</p>
                            <h1>${producto.precio}</h1>
                        </a>
                    ))}
            </div>
            <br />
            <h1 className='subs'>Teclados</h1>
            <div className='fondoimg'>
                {productos
                    .filter(producto => producto.tipoDeProducto === "Teclado")
                    .slice(0, 7)
                    .map(producto => (
                        <a key={producto.productoId} onClick={() => navegarALogin()}>
                            <img src={producto.foto} width={200} height={200} alt={producto.modelo} />
                            <p>{producto.modelo}</p>
                            <h1>${producto.precio}</h1>
                        </a>
                    ))}
            </div>
            <br />
            <h1 className='subs'>Mouses</h1>
            <div className='fondoimg'>
                {productos
                    .filter(producto => producto.tipoDeProducto === "Mouse")
                    .slice(0, 7)
                    .map(producto => (
                        <a key={producto.productoId} onClick={() => navegarALogin()}>
                            <img src={producto.foto} width={200} height={200} alt={producto.modelo} />
                            <p>{producto.modelo}</p>
                            <h1>${producto.precio}</h1>
                        </a>
                    ))}
            </div>
            <br />
            <h1 className='subs'>Mousepads</h1>
            <div className='fondoimg'>
                {productos
                    .filter(producto => producto.tipoDeProducto === "Mousepad")
                    .slice(0, 7)
                    .map(producto => (
                        <a key={producto.productoId} onClick={() => navegarALogin()}>
                            <img src={producto.foto} width={200} height={200} alt={producto.modelo} />
                            <p>{producto.modelo}</p>
                            <h1>${producto.precio}</h1>
                        </a>
                    ))}
            </div>
            <br />
            <h1 className='subs'>Sillas Gamers</h1>
            <div className='fondoimg'>
                {productos
                    .filter(producto => producto.tipoDeProducto === "Silla Gamer")
                    .slice(0, 7)
                    .map(producto => (
                        <a key={producto.productoId} onClick={() => navegarALogin()}>
                            <img src={producto.foto} width={200} height={200} alt={producto.modelo} />
                            <p>{producto.modelo}</p>
                            <h1>${producto.precio}</h1>
                        </a>
                    ))}
            </div>
        </>
    );
}