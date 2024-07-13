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
import { TiShoppingCart } from "react-icons/ti";
import { FaUserGear } from 'react-icons/fa6';

export default function Home() {
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

            <button className='logoCarrito' onClick={() => { navegarALogin() }}><TiShoppingCart size={42} /></button>

            <button onClick={() => navegarALogin()} className='ini'>Iniciar sesión</button>

                <Slider {...settings} className='carousel'>
                    <div>
                        <img src="./img/1.png" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <img src="./img/2.png" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <img src="./img/3.png" style={{ width: '100%' }} />
                    </div>
                </Slider>

                <div className='subs'>Auriculares</div>
                <div className='fondoimg'>
                    {productos
                        .filter(producto => producto.tipoDeProducto === "Auriculares")
                        .slice(0, 7)
                        .map(producto => (
                            <a key={producto.productoId} onClick={() => navegarALogin()}>
                                <img className='fotoMain' src={producto.foto}></img>
                                <p>{producto.modelo}</p>
                                <div>${producto.precio}</div>
                            </a>
                        ))}
                </div>

                <h2 className='subs'>Teclados</h2>
                <div className='fondoimg'>
                    {productos
                        .filter(producto => producto.tipoDeProducto === "Teclado")
                        .slice(0, 7)
                        .map(producto => (
                            <a key={producto.productoId} onClick={() => navegarALogin()}>
                                <img className='fotoMain' src={producto.foto}></img>
                                <p>{producto.modelo}</p>
                                <div>${producto.precio}</div>
                            </a>
                        ))}
                </div>

                <h2 className='subs'>Mouses</h2>
                <div className='fondoimg'>
                    {productos
                        .filter(producto => producto.tipoDeProducto === "Mouse")
                        .slice(0, 7)
                        .map(producto => (
                            <a key={producto.productoId} onClick={() => navegarALogin()}>
                                <img className='fotoMain' src={producto.foto}></img>
                                <p>{producto.modelo}</p>
                                <div>${producto.precio}</div>
                            </a>
                        ))}
                </div>

                <h2 className='subs'>Mousepads</h2>
                <div className='fondoimg'>
                    {productos
                        .filter(producto => producto.tipoDeProducto === "Mousepad")
                        .slice(0, 7)
                        .map(producto => (
                            <a key={producto.productoId} onClick={() => navegarALogin()}>
                                <img className='fotoMain' src={producto.foto}></img>
                                <p>{producto.modelo}</p>
                                <div>${producto.precio}</div>
                            </a>
                        ))}
                </div>

                <h2 className='subs'>Sillas Gamers</h2>
                <div className='fondoimg'>
                    {productos
                        .filter(producto => producto.tipoDeProducto === "Silla Gamer")
                        .map(producto => (
                            <a key={producto.productoId} onClick={() => navegarALogin()}>
                                <img className="fotoMain" src={producto.foto}></img>
                                <p>{producto.modelo}</p>
                                <div>${producto.precio}</div>
                            </a>
                        ))}
                </div>
            </>
            );
}