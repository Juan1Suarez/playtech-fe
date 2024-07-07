"use client";
import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import { verProductos } from '@/app/services/Producto';
import Producto from '../../services/model/producto.model';
import { useRouter } from 'next/navigation';
import {withRoles} from '@/app/services/HOC/withRoles';
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const MainUser = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [productos, setProductos] = useState<Producto[]>([]);

    const router = useRouter();
    const navegarAProducto = (modelo: string) => {
        router.push("/producto?modelo="+ modelo);
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

            <div className='adminuser'>User</div>
            <button onClick={LogOut} className='adminuser'>Log out</button>
            <div className='fondodark'>
                <div>Dark mode</div>
                <Switch onChange={toggleDarkMode} checked={darkMode} className='switch' form="flexSwitchCheckChecked" />
            </div>

            <Slider {...settings}>
            <div>
                    <img src="./img/nuestrasmarcas.png" style={{ width: '100%'}} />
                </div>
                <div>
                    <img src="./img/nuestrasmarcas.png" style={{ width: '100%' }} />
                </div>
                <div>
                    <img src="./img/nuestrasmarcas.png" style={{ width: '100%' }} />
                </div>
            </Slider>

            <h1 className='subs'>Auriculares</h1>
            <div className='fondoimg'>
                {productos
                    .filter(producto => producto.tipoDeProducto === "Auriculares")
                    .slice(0, 7)
                    .map(producto => (
                        <a key={producto.productoId}  onClick={() => navegarAProducto(producto.modelo)}>
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
                    .slice(0, 7)
                    .map(producto => (
                        <a key={producto.productoId}  onClick={() => navegarAProducto(producto.modelo)}>
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
                    .slice(0, 7)
                    .map(producto => (
                        <a key={producto.productoId}  onClick={() => navegarAProducto(producto.modelo)}>
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
                    .slice(0, 7)
                    .map(producto => (
                        <a key={producto.productoId}  onClick={() => navegarAProducto(producto.modelo)}>
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
                    .slice(0, 7)
                    .map(producto => (
                        <a key={producto.productoId}  onClick={() => navegarAProducto(producto.modelo)}>
                            <img src={producto.foto} width={200} height={200}></img>
                            <p>{producto.modelo}</p>
                            <h1>${producto.precio}</h1>
                        </a>
                    ))}
            </div>
        </>
    );
}

export default withRoles(MainUser, [2], '/login');