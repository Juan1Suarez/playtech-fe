"use client";
import React, { useEffect, useState } from 'react';
import { verProductos, verTipoDeProductos } from '@/app/services/Producto';
import Producto from '../../services/model/producto.model';
import { useRouter } from 'next/navigation';
import Slider from "react-slick";
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TiShoppingCart } from "react-icons/ti";
import tipoDeProducto from '@/app/services/model/tipoDeProducto.model';

export default function Home() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [grupo, setGrupo] = useState<tipoDeProducto[]>([]);

    const router = useRouter();
    const navegarALogin = () => {
        router.push("/login");
    }

    useEffect(() => {
        verProductos().then((data: Producto[]) => {
            setProductos(data);
        });
    }, []);
    
    useEffect(() => {
        verTipoDeProductos().then((data: tipoDeProducto[]) => {
            setGrupo(data);
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
            <img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png' alt="Logo"/>

            <Container className='caidaproductos'>
                <Dropdown title="¿Qué tipo de producto estás buscando?" size="lg">
                    {grupo.map(grupo => (
                        <Dropdown.Item key={grupo.tipoDeProductoId} onClick={() => { navegarALogin() }}>
                            {grupo.grupo}
                        </Dropdown.Item>
                    ))}
                </Dropdown>
            </Container>


            <button className='logoCarrito' onClick={() => { navegarALogin() }}><TiShoppingCart size={42} /></button>

            <button onClick={() => navegarALogin()} className='ini'>Iniciar sesión</button>

                <Slider {...settings} className='carousel'>
                    <div>
                        <img src="./img/1.png" style={{ width: '100%' }}  alt="Nuestras marcas"/>
                    </div>
                    <div>
                        <img src="./img/2.png" style={{ width: '100%' }} alt="Nuestras marcas"/>
                    </div>
                    <div>
                        <img src="./img/3.png" style={{ width: '100%' }} alt="Nuestras marcas" />
                    </div>
                </Slider>

                {grupo.map(grupo => (
                <div key={grupo.tipoDeProductoId}>
                    <div className='subs'>{grupo.grupo}</div>
                    <div className='fondoimg'>
                        {productos
                            .filter(producto => producto.tipoDeProducto === grupo.grupo)
                            .slice(0, 7)
                            .map(producto => (
                                <a key={producto.productoId} onClick={() => navegarALogin()}>
                                    <img className='fotoMain' src={producto.foto} alt={producto.modelo}/>
                                    <p>{producto.modelo}</p>
                                    <div>${producto.precio}</div>
                                </a>
                            ))}
                    </div>
                </div>
            ))}
            </>
            );
}