"use client";
import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import { crearProducto, verProductos } from '@/app/services/Producto';
import Producto from '../../services/model/producto.model';
import { useRouter } from 'next/navigation';
import { withRoles } from '@/app/services/HOC/withRoles';
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';

const MainAdmin = () => {


    const [darkMode, setDarkMode] = useState(false);
    const [productos, setProductos] = useState<Producto[]>([]);
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
    const navegarAProducto = (producto: Producto) => {
        sessionStorage.setItem('productoSeleccionado', JSON.stringify(producto));
        router.push("/productoAdmin");
    }

    const navegarARegistroVentas = () => {
        router.push("/registroVentas")
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
            await crearProducto(nuevoProducto, router);
            verProductos();
            handleClosePopup();
    };

    const LogOut = () => {
        localStorage.clear();
        window.location.reload();
      }

    return (
        <>
  <img className="playmain" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img>

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
            <h1 className='subs'>Auriculares</h1>
            <div className='fondoimg'>
                {productos
                    .filter(producto => producto.tipoDeProducto === "Auriculares")
                    .map(producto => (
                        <a key={producto.productoId} onClick={() => navegarAProducto(producto)}>
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
                    .map(producto => (
                        <a key={producto.productoId} onClick={() => navegarAProducto(producto)}>
                            <img src={producto.foto} width={200} height={200}></img>
                            <p>{producto.modelo}</p>
                            <h1>${producto.precio}</h1>
                        </a>
                    ))}
            </div>
            <br></br>
            <h1 className='subs'>Mouses</h1>
            <div className='fondoimg'>
                {productos
                    .filter(producto => producto.tipoDeProducto === "Mouse")
                    .map(producto => (
                        <a key={producto.productoId} onClick={() => navegarAProducto(producto)}>
                            <img src={producto.foto} width={200} height={200}></img>
                            <p>{producto.modelo}</p>
                            <h1>${producto.precio}</h1>
                        </a>
                    ))}
            </div>
            <br></br>
            <h1 className='subs'>Mousepads</h1>
            <div className='fondoimg'>
                {productos
                    .filter(producto => producto.tipoDeProducto === "Mousepad")
                    .map(producto => (
                        <a key={producto.productoId} onClick={() => navegarAProducto(producto)}>
                            <img src={producto.foto} width={200} height={200}></img>
                            <p>{producto.modelo}</p>
                            <h1>${producto.precio}</h1>
                        </a>
                    ))}
            </div>
            <br></br>
            <h1 className='subs'>Sillas Gamers</h1>
            <div className='fondoimg'>
                {productos
                    .filter(producto => producto.tipoDeProducto === "Silla Gamer")
                    .map(producto => (
                        <a key={producto.productoId} onClick={() => navegarAProducto(producto)}>
                            <img src={producto.foto} width={200} height={200}></img>
                            <p>{producto.modelo}</p>
                            <h1>${producto.precio}</h1>
                        </a>
                    ))}
            </div>
            <button className='nuevoProducto' onClick={handleEditClick}>Añadir producto</button>

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
      <input type="text" name="foto" placeholder='Foto' onChange={handleChange} />
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

export default withRoles(MainAdmin, [1], "/login");