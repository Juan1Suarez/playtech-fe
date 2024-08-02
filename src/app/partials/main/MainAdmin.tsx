"use client";
import { UsardarkMode } from '@/app/services/DarkMode';
import { withRoles } from '@/app/services/HOC/withRoles';
import { eliminarUsuario } from '@/app/services/Login';
import { LogOut } from '@/app/services/LogOut';
import Producto from '@/app/services/model/producto.model';
import { useNombre } from '@/app/services/Nombre';
import { crearProducto, verProductos } from '@/app/services/Producto';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaUserGear } from "react-icons/fa6";
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';


const VerAdminPage = () => {
  const { darkMode, activarDarkMode } = UsardarkMode();
  const [showPopup, setShowPopup] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState<Producto>({
    tipoDeProducto: '',
    modelo: '',
    precio: 0,
    color: '',
    stock: 0,
    foto: '',
    descripcion: ''
});

    const router = useRouter();
  const navegarAMain = () => {
    router.push("/mainAdmin");
  }

  const navegarARegistroVentas = () => {
    router.push("/registroVentas")
}

  const navegarAProducto = (modelo: string) => {
    router.push("/productoAdmin?modelo=" + modelo);
}

  const [productos, setProductos] = useState<Producto[]>([]);
  useEffect(() => {
    verProductos().then((data: Producto[]) => {
        setProductos(data);
    })
}, [])

const [sortOrder, setSortOrder] = useState('asc');

const sortProducto = () => {
  const sortedProducto = [...productos].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.precio - b.precio;
    } else {
      return b.precio - a.precio;
    }
  });
  setProductos(sortedProducto);
  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
};

const handleEditClick = () => {
  setShowPopup(true);
};

const handleClosePopup = () => {
  setShowPopup(false);
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setNuevoProducto({ ...nuevoProducto, [name]: value });
};

const handleSubmit = async () => {
  try {
      if (!nuevoProducto.tipoDeProducto || !nuevoProducto.modelo || !nuevoProducto.precio || !nuevoProducto.color || !nuevoProducto.stock || !nuevoProducto.descripcion) {
          alert('Por favor, complete todos los campos.');
          return;
      }
      if (nuevoProducto.modelo.length > 20) {
          alert('El modelo no puede exceder los 20 caracteres.');
          return;
      }
      if (nuevoProducto.precio > 99999999999) {
          alert('El precio no puede exceder los 11 caracteres.');
          return;
      }
      if (nuevoProducto.color.length > 20) {
          alert('El color no puede exceder los 20 caracteres.');
          return;
      }
      if (nuevoProducto.stock > 500) {
          alert('El stock no puede ser más de 500.');
          return;
      }
      if (nuevoProducto.descripcion.length > 500) {
          alert('La descripción no puede exceder los 500 caracteres.');
          return;
      }
      await crearProducto(nuevoProducto, router);
      verProductos();
      handleClosePopup();
  } catch (error) {
      console.error('Error al modificar producto', error);
  }
};

  return (
    <>
<img onClick={() => navegarAMain()} className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png' alt='Logo'/>
<Container className='caidaproductos'>
<Dropdown onClick={() => navegarARegistroVentas()} title="Redireccionar al registro de ventas" size="lg" >
  </Dropdown>
</Container>


<div className='configUser'>
  <Dropdown title={<FaUserGear size={42} />}>
    <Dropdown.Menu title="Admin">
      <Dropdown.Item >{useNombre()}</Dropdown.Item>
      <Dropdown.Item onClick={handleEditClick}>Añadir producto</Dropdown.Item>
      <Dropdown.Item onClick={LogOut}>Cerrar sesión</Dropdown.Item>
      <Dropdown.Item onClick={eliminarUsuario}>Eliminar cuenta</Dropdown.Item>
    </Dropdown.Menu>
    <Dropdown.Item onClick={activarDarkMode} className='switch' >Dark mode</Dropdown.Item>
  </Dropdown>
</div>

<div className='filtrarProducto'>
  <div className='filtrarInput'>
  <label className='filtrarLabel'>Buscar por modelo</label>
  <input placeholder='...'></input>
<br></br>
  <label className='filtrarLabel'>Tipo de producto</label>

  <select>
  <option className='filtrarInput'>...ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</option>
  <option value="Auriculares">Auriculares</option>
  <option value="Teclados">Teclados</option>
  <option value="Silla gamer">Silla gamer</option>
  <option value="Gabinete">Gabinete</option>
  <option value="MousePads">MousePads</option>
  <option value="Mouse">Mouse</option>
</select>
  </div>
  <button className='filtrarButton'>Buscar</button>
</div>

<button className='adminPrecio' onClick={sortProducto}>Precio {sortOrder === 'asc' ? '↓' : '↑'}</button>
        {productos
          .map(producto => (
            <div className='keyAdmin' key={producto.productoId}>
             <div className='englobadorPAdmin'> 
                <img className='fotoAdmin' src={producto.foto} alt={producto.modelo}/>             
                <h3 className='modeloPAdmin' >{producto.modelo}</h3>     
                <h3 className='precioPAdmin'>${producto.precio} </h3>
               <button className='verPAdmin' onClick={() => navegarAProducto(producto.modelo)}>Ver Producto</button>
               <button className='verPAdmin' onClick={() => navegarAProducto(producto.modelo)}>Editar producto</button>
              </div>
              </div>
          ))}      

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
                        <input type="text" name="modelo" placeholder='Modelo' onChange={handleChange} />
                        <div> Precio</div>
                        <input type="number" name="precio" placeholder='Precio' onChange={handleChange} />
                        <div> Color</div>
                        <input type="text" name="color" placeholder='Color' onChange={handleChange} />
                        <div> Stock</div>
                        <input type="number" name="stock" placeholder='Stock' onChange={handleChange} />
                        <div> Foto</div>
                        <small>Para cambiar foto vaya a editar producto.</small>
                        <div> Descripción</div>
                        <textarea name="descripcion" placeholder='Descripción' style={{ fontFamily: 'inherit', width: '300px', height: '100px' }} onChange={handleChange} />
                        <button onClick={handleSubmit}> Realizar cambios</button>
                        <button onClick={handleClosePopup}>Cancelar</button>
                    </div>
                </div>
            )}
    </>
  );
}

export default withRoles(VerAdminPage, [1], '/login');