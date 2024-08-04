"use client";
import React, { useEffect, useState } from 'react';
import { verProductos } from '@/app/services/Producto';
import Producto from '../../services/model/producto.model';
import { useRouter } from 'next/navigation';
import {withRoles} from '@/app/services/HOC/withRoles';
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaUserGear } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { eliminarUsuario } from '@/app/services/Login';
import { LogOut } from '@/app/services/LogOut';
import { UsardarkMode } from '@/app/services/DarkMode';
import { useNombre } from '@/app/services/Nombre';

const MainUser = () => {
    const { darkMode, activarDarkMode } = UsardarkMode();
    const [productos, setProductos] = useState<Producto[]>([]);

    const router = useRouter();
    const navegarAProducto = (modelo: string) => {
        router.push("/producto?modelo="+ modelo);
    }

    useEffect(() => {
        verProductos().then((data: Producto[]) => {
            setProductos(data);
        })
    }, [])
    

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const navegarACarrito = () => {
        router.push("/carritoDeCompras");
      };
      
      const tiposDeProducto = Array.from(new Set(productos.map(producto => producto.tipoDeProducto)));
  
    return (
        <>
    <button className='logoCarrito' onClick={() => { navegarACarrito() }}><TiShoppingCart size={42}/></button>

            <Slider {...settings} className='carousel'>
                <div>
                    <img src="./img/1.png" style={{ width: '100%'}} alt='Nuestras marcas'/>
                </div>
                <div>
                    <img src="./img/2.png" style={{ width: '100%' }} alt='Nuestras marcas' />
                </div>
                <div>
                    <img src="./img/3.png" style={{ width: '100%' }} alt='Nuestras marcas' />
                </div>
            </Slider>
  
            {tiposDeProducto.map(tipo => (
                <div key={tipo}>
                    <a>
                        <div className='subs'>{tipo}</div>
                    </a>
                    <div className='fondoimg'>
                        {productos
                            .filter(producto => producto.tipoDeProducto === tipo)
                            .slice(0, 7)
                            .map(producto => (
                                <a key={producto.productoId} onClick={() => navegarAProducto(producto.modelo)}>
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

export default withRoles(MainUser, [2], '/login');
