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
import { jwtDecode } from 'jwt-decode';

const MainUser = () => {
    const [darkMode, setDarkMode] = useState(false);
    
    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(storedDarkMode);
        document.body.classList.toggle("darkMode", storedDarkMode);
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prev => {
            const newDarkMode = !prev;
            document.body.classList.toggle("darkMode", newDarkMode);
            localStorage.setItem('darkMode', newDarkMode ? 'true' : 'false');
            return newDarkMode;
        });
    }; 
    
    
    const [productos, setProductos] = useState<Producto[]>([]);
    const [nombre, setNombre] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        
        if (token) {
          try {
            const decodedToken: { nombre: string } = jwtDecode(token);
            setNombre(decodedToken.nombre);
          } catch (error) {
            console.log("No hay un usuario")
          }
        }
      }, []);

    const router = useRouter();
    const navegarAProducto = (modelo: string) => {
        router.push("/producto?modelo="+ modelo);
    }

    useEffect(() => {
        verProductos().then((data: Producto[]) => {
            setProductos(data);
        })
    }, [])



    const LogOut = () => {
        localStorage.clear();
        window.location.reload();
      }


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
  
    return (
        <>
            <img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img>
            <Container className='caidaproductos'>
      <Dropdown title="¿Qué tipo de producto estás buscando?" size="lg">
        <Dropdown.Item as="a" href="listaProducto?tipo=Auriculares">Auriculares</Dropdown.Item>
        <Dropdown.Item as="a" href="listaProducto?tipo=Teclado">Teclados</Dropdown.Item>
        <Dropdown.Item as="a" href="listaProducto?tipo=Mouse">Mouses</Dropdown.Item>
        <Dropdown.Item as="a" href="listaProducto?tipo=Mousepad">Mousepads</Dropdown.Item>
        <Dropdown.Item as="a" href="listaProducto?tipo=Silla%20Gamer">Sillas</Dropdown.Item>
      </Dropdown>
    </Container>


    <div className='configUser'>
    <Dropdown title={<FaUserGear size={42} />}>
<Dropdown.Menu title="User">
<Dropdown.Item >{nombre}</Dropdown.Item>
<Dropdown.Item onClick={LogOut}>Cerrar sesión</Dropdown.Item>
</Dropdown.Menu>     
      <Dropdown.Item onClick={toggleDarkMode}  className='switch' >Dark mode</Dropdown.Item> 
  </Dropdown>
</div>

    <button className='logoCarrito' onClick={() => { navegarACarrito() }}><TiShoppingCart size={42}/></button>

            <Slider {...settings} className='carousel'>
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

<div className='subs'>Auriculares</div>
<div className='fondoimg'>
    {productos
        .filter(producto => producto.tipoDeProducto === "Auriculares")
        .slice(0, 7)
        .map(producto => (
            <a key={producto.productoId} onClick={() => navegarAProducto(producto.modelo)}>
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
            <a key={producto.productoId} onClick={() => navegarAProducto(producto.modelo)}>
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
            <a key={producto.productoId} onClick={() => navegarAProducto(producto.modelo)}>
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
            <a key={producto.productoId} onClick={() => navegarAProducto(producto.modelo)}>
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
            <a key={producto.productoId} onClick={() => navegarAProducto(producto.modelo)}>
                <img className="fotoMain" src={producto.foto}></img>
                <p>{producto.modelo}</p>
                <div>${producto.precio}</div>
            </a>
        ))}
</div>
</>
    );
}

export default withRoles(MainUser, [2], '/login');