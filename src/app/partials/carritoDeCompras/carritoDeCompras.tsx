"use client";
import { withRoles } from '@/app/services/HOC/withRoles';
import React, { useEffect, useState } from 'react';
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';
import Producto from '../../services/model/producto.model';
import { registroVenta, restarStock } from '@/app/services/Registro';
import { FaUserGear } from 'react-icons/fa6';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { eliminarUsuario } from '@/app/services/Login';
import { LogOut } from '@/app/services/LogOut';
import { UsardarkMode } from '@/app/services/DarkMode';
import { usarNombre } from '@/app/services/Nombre';


const CarritoDeCompras = () => {
  const { darkMode, activarDarkMode } = UsardarkMode();
  const [productos, setProductos] = useState<Producto[]>([]);
   const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const navegarAMain = () => {
    router.push("/mainUser");
  }

  useEffect(() => {
    setIsClient(true);
    const storedProductos = localStorage.getItem('carrodecompras');
    if (storedProductos) {
      const productosRecuperados: Producto[] = JSON.parse(storedProductos);
      setProductos(productosRecuperados);
    }
  }, []);

  if (isClient && !localStorage.getItem('carrodecompras')) {
    return (
      <>
<a href='mainUser'><img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img></a>

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
      <Dropdown.Item >{usarNombre()}</Dropdown.Item>
      <Dropdown.Item onClick={LogOut}>Cerrar sesión</Dropdown.Item>
      <Dropdown.Item onClick={eliminarUsuario}>Eliminar cuenta</Dropdown.Item>
    </Dropdown.Menu>
    <Dropdown.Item onClick={activarDarkMode} className='switch' >Dark mode</Dropdown.Item>
  </Dropdown>
</div>
    <p className='error'>No hay articulos en el carrito de compra</p>
    <br></br><br></br><br></br><br></br>

      </>
    );
  }


  const finalizarCompra = async () => {
    const token = localStorage.getItem('accessToken')!;
    const decodedToken: { usuarioId: number } = jwtDecode(token);
    const usuarioId = decodedToken.usuarioId;
  
    const restarStockPromises = productos.map(producto => {
      const productoId = producto.productoId;
      if (productoId !== undefined) {
        return restarStock(productoId);
      }
      return Promise.resolve();
    });
    try {
      await Promise.all(restarStockPromises);
  
      const registroPromises = productos.map(producto => {
        const productoId = producto.productoId;
        return registroVenta(productoId, usuarioId);
      });
      
      await Promise.all(registroPromises); 
      alert("¡Tu compra se ha completado con éxito!");
      localStorage.removeItem('carrodecompras');
      navegarAMain();
    } catch (error) {
      alert("Uno de los productos elegidos no esta en stock. Intenta nuevamente.");
      console.error(error);
    }
  };

  const borrarCompra = () => {
    const confirm = window.confirm("¿Estás seguro de que quieres eliminar el carrito?");
    if (!confirm) {
        return;
    }
    localStorage.removeItem('carrodecompras');
    window.location.reload();
  }

  return (
    <>
      <a href='mainUser'><img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img></a>

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
            <Dropdown.Item >{usarNombre()}</Dropdown.Item>
            <Dropdown.Item onClick={LogOut}>Cerrar sesión</Dropdown.Item>
            <Dropdown.Item onClick={eliminarUsuario}>Eliminar cuenta</Dropdown.Item>
          </Dropdown.Menu>
          <Dropdown.Item onClick={activarDarkMode} className='switch' >Dark mode</Dropdown.Item>
        </Dropdown>
      </div>

      <div className='carritoProducto'>
        {productos.map((producto, index) => (
          <div key={index} className='productoElegido'>
            <img className='fotoCarrito' src={producto.foto} />
            <h1 className='textoProducto'>{producto.modelo}</h1>
            <h1 className='valorproducto'>$ {producto.precio}</h1>
          </div>
        ))}
        <div className='divisor'></div>
      </div>
      <div className='borrarCarrito' onClick={borrarCompra}>Limpiar el carrito</div>

      <div className='comprarProducto'>
        {productos.length > 0 && (
          <div>
            <div className='nombreEnLista'>
              {productos.map((producto, index) => (
                <div className='nombreProducto' key={index}>{producto.modelo}</div>
              ))}
            </div>
            <div className='divisor1' />
            <h1 className='precioTotal'>Precio total = ${productos.reduce((total, producto) => total + producto.precio, 0)}</h1>
            <div className='fin' onClick={finalizarCompra}>Finalizar transacción</div>
          </div>
        )}
      </div>
      <br></br><br></br><br></br><br></br>
    </>
  );
}

export default withRoles(CarritoDeCompras, [2], '/login');