"use client";
import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';;
import Producto from '../../services/model/producto.model';
import { withRoles } from '@/app/services/HOC/withRoles';
import { eliminarProducto, modificarProducto } from '@/app/services/Producto';
import { useRouter } from 'next/navigation';
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';


const ProductoAdminPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  const navegarARegistroVentas = () => {
    router.push("/registroVentas")
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("darkMode", !darkMode);
  };

  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    const storedProducto = sessionStorage.getItem('productoSeleccionado');
    if (storedProducto) {
      const productoRecuperado: Producto = JSON.parse(storedProducto);
      setProducto(productoRecuperado);
    }
  }, []);

  if (!producto) {
    return <div>ERROR PAGINA NO ENCONTRADA</div>;
  }

  const handleEditClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (!producto.tipoDeProducto || !producto.modelo || !producto.precio || !producto.color || !producto.stock || !producto.descripcion) {
        alert('Por favor, complete todos los campos.');
        return;
      }
      if (producto.modelo.length > 34) {
        alert('El modelo no puede exceder los 34 caracteres.');
        return;
      }
      if (producto.precio > 99999999999) {
        alert('El stock no puede exceder los 11 caracteres.');
        return;
      }
      if (producto.color.length > 20) {
        alert('El color no puede exceder los 20 caracteres.');
        return;
      }
      if (producto.stock > 500) {
        alert('El stock no puede exceder los 500 caracteres.');
        return;
      }
      if (producto.descripcion.length > 255) {
        alert('La descripción no puede exceder los 255 caracteres.');
        return;
      }

      await modificarProducto(producto.productoId, producto, router);
      handleClosePopup();
    } catch (error) {
      console.error('Error al modificar producto', error);

    }
  };

  const LogOut = () => {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <>
      <a href='mainAdmin'><img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img></a>

      <Container className='caidaproductos'>
        <Dropdown onClick={() => navegarARegistroVentas()} title="Redireccionar al registro de ventas" size="lg" >
        </Dropdown>
      </Container>

      <div className='adminuser'>Admin</div>
      <button className='adminuser' onClick={LogOut}>Log out</button>
      <div className='fondodark'>
        <div>Dark mode</div>
        <Switch onChange={toggleDarkMode} checked={darkMode} className='switch' form="flexSwitchCheckChecked" />
      </div>
      <div className='nombreproducto'>{producto.modelo}</div>
      <div className='precioproducto'>Precio: {producto.precio}</div>
      <div className="dropdown">
        <button className="dropbtn">Color:</button>
        <div className="dropdown-content">
          <a href="#">{producto.color}</a>
        </div>
      </div>

      <div className='productos'>
        <img src={producto.foto} className='fotoP'></img>
        <div className='productosComprar'>
          <button
            className='botoneliminar'
            onClick={() => {
              if (window.confirm('¿Está seguro de que quiere eliminar este producto?')) {
                eliminarProducto(producto.productoId, router);
              }
            }}
          > Eliminar producto
          </button>
          <button className='botonagregar' onClick={handleEditClick}>
            Editar producto
          </button>

          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <span className="close" onClick={handleClosePopup}>&times;</span>
                <div> Tipo de producto</div>
                <select name="tipoDeProducto" onChange={handleChange} defaultValue="">
                  <option value="" disabled>Seleccionar tipo de producto</option>
                  <option value="Auriculares">Auriculares</option>
                  <option value="Teclado">Teclado</option>
                  <option value="Mouse">Mouse</option>
                  <option value="Mousepad">Mousepad</option>
                  <option value="Silla Gamer">Silla Gamer</option>
                </select>
                <div> Modelo</div>
                <input type="text" name="modelo" value={producto.modelo} onChange={handleChange} />
                <div> Precio</div>
                <input type="text" name="precio" value={producto.precio} onChange={handleChange} />
                <div> Color</div>
                <input type="text" name="color" value={producto.color} onChange={handleChange} />
                <div> Stock</div>
                <input type="text" name="stock" value={producto.stock} onChange={handleChange} />
                <div> Foto</div>
                <input type="text" name="foto" value={producto.foto} onChange={handleChange} />
                <div> Descripción</div>
                <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} style={{ fontFamily: 'inherit', width: '300px', height: '100px' }} />
                <button onClick={handleSubmit}> Realizar cambios</button>
                <button onClick={handleClosePopup}>Cancelar</button>
              </div>
            </div>
          )}


          <h1 className='envio'>Seleccione el t͟i͟p͟o͟ d͟e͟ e͟n͟v͟i͟o͟</h1>

        </div>
      </div>

      <div className='productosDesc'>
        <h1 className='desc'>Descripción del producto</h1>
        <h2 className='productoNombre'>Modelo : {producto.modelo}</h2>
        <p className='productoTexto'>{producto.descripcion}</p>
        <p className='productoTexto'>STOCK: {producto.stock}</p>
        <p className='productoTexto'>PRECIO: {producto.precio}</p>
        <p className='productoTexto'>ID: {producto.productoId}</p>
      </div>

    </>


  );
}

export default withRoles(ProductoAdminPage, [1], '/login');