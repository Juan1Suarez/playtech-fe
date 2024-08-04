"use client";
import { withRoles } from '@/app/services/HOC/withRoles';
import Producto from '@/app/services/model/producto.model';
import { crearProducto, verProductos } from '@/app/services/Producto';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import 'rsuite/Dropdown/styles/index.css';


const VerAdminPage = () => {
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
<div className='filtrarProducto'>
  <div className='filtrarInput'>
  <label className='filtrarLabel'>Buscar por modelo</label>
  <input placeholder='...'></input>
<br></br>
  <label className='filtrarLabel'>Tipo de producto</label>

  <select>
  <option className='filtrarInput'>...</option>
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

<button className='crearProducto' onClick={handleEditClick}>Añadir producto</button>
<button className='adminPrecio' onClick={sortProducto}>Precio {sortOrder === 'asc' ? '↓' : '↑'}</button>
        {productos
          .map(producto => (
            <div className='keyAdmin' key={producto.productoId}>
             <div className='englobadorPAdmin'> 
                <img className='fotoAdmin' src={producto.foto}/>             
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