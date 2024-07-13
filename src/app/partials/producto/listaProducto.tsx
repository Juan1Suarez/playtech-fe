"use client";
import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import { withRoles } from '@/app/services/HOC/withRoles';
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';
import { verProductos } from '@/app/services/Producto';
import Producto from '../../services/model/producto.model';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { FaUserGear } from "react-icons/fa6";
import { TiShoppingCart } from "react-icons/ti";
import { jwtDecode } from 'jwt-decode';

const ListaProducto = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [tipoProducto, setTipoProducto] = useState<string>('');
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
    
  const searchParams = useSearchParams();
  const tipoParam = searchParams.get('tipo');

  useEffect(() => {
    verProductos().then((data: Producto[]) => {
      setProductos(data);
    });

    if (tipoParam) {
      setTipoProducto(tipoParam);
    }
  }, [tipoParam]);

  const router = useRouter();
  const navegarAProducto = (modelo: string) => {
    router.push("/producto?modelo="+ modelo);
  };

  const botonProducto = (tipo: string) => {
    router.push(`/listaProducto?tipo=${tipo.replace(/ /g, '%20')}`);
  };

  const LogOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  const navegarACarrito = () => {
    router.push("/carritoDeCompras");
  };

  return (
    <>
      <a href='mainUser'><img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png' alt="Logo"></img></a>

      <Container className='caidaproductos'>
      <Dropdown title="¿Qué tipo de producto estás buscando?" size="lg">
        <Dropdown.Item as="a" href="listaProducto?tipo=Auriculares">Auriculares</Dropdown.Item>
        <Dropdown.Item as="a" href="listaProducto?tipo=Teclado">Teclados</Dropdown.Item>
        <Dropdown.Item as="a" href="listaProducto?tipo=Mouse">Mouses</Dropdown.Item>
        <Dropdown.Item as="a" href="listaProducto?tipo=Mousepad">Mousepads</Dropdown.Item>
        <Dropdown.Item as="a" href="listaProducto?tipo=Silla%20Gamer">Sillas</Dropdown.Item>
      </Dropdown>
    </Container>
    <br></br>
    <div className='configUser'>
    <Dropdown title={<FaUserGear size={42} />}>
          <Dropdown.Menu title="User">
            <Dropdown.Item >{nombre}</Dropdown.Item>
            <Dropdown.Item onClick={LogOut}>Cerrar sesión</Dropdown.Item>
          </Dropdown.Menu>
          <Dropdown.Item onClick={toggleDarkMode} className='switch' >Dark mode</Dropdown.Item>
        </Dropdown>
      </div>

    <button className='logoCarrito' onClick={() => { navegarACarrito() }}><TiShoppingCart size={42}/></button>
      

      <div className='containerProductos'>
        <button className='productosListado' onClick={() => botonProducto('Auriculares')}>Auriculares</button>
        <button className='productosListado' onClick={() => botonProducto('Teclado')}>Teclado</button>
        <button className='productosListado' onClick={() => botonProducto('Mousepad')}>Mousepad</button>
        <button className='productosListado' onClick={() => botonProducto('Silla Gamer')}>Silla gamer</button>
      </div>

      <div className='buscadorProductos'>
        {productos
          .filter(producto => producto.tipoDeProducto === tipoProducto)
          .map(producto => (
            <div className='cardProducto' key={producto.productoId}>
              <img src={producto.foto} className="imgListado" alt={producto.modelo}></img>
              <div className='detalles'>
                <h1 className='prod'>{producto.modelo}</h1>
                <h1 className='preci'>{producto.precio} $</h1>
                <h3 className='co'>Color: {producto.color}</h3>
                <h3 className='sto'>STOCK: {producto.stock}</h3>
                <button className='verP' onClick={() => navegarAProducto(producto.modelo)}>Ver Producto</button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default withRoles(ListaProducto, [2], '/login');