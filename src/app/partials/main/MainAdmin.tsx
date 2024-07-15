"use client";
import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import { crearProducto, upload, verProductos } from '@/app/services/Producto';
import Producto from '../../services/model/producto.model';
import { useRouter } from 'next/navigation';
import { withRoles } from '@/app/services/HOC/withRoles';
import { Container, Dropdown } from 'rsuite';
import 'rsuite/Dropdown/styles/index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaUserGear } from "react-icons/fa6";
import DropdownItem from 'rsuite/esm/Dropdown/DropdownItem';
import { jwtDecode } from 'jwt-decode';
import { eliminarUsuario } from '@/app/services/Login';

const MainAdmin = () => {
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
    const navegarAProducto = (modelo: string) => {
        router.push("/productoAdmin?modelo=" + modelo);
    }

    const navegarARegistroVentas = () => {
        router.push("/registroVentas")
    }

    useEffect(() => {
        verProductos().then((data: Producto[]) => {
            setProductos(data);
        })
    })

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
            if (nuevoProducto.modelo.length > 34) {
                alert('El modelo no puede exceder los 34 caracteres.');
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

    const LogOut = () => {
        localStorage.clear();
        window.location.reload();
    }

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
                <Dropdown onClick={() => navegarARegistroVentas()} title="Redireccionar al registro de ventas" size="lg" >
                </Dropdown>
            </Container>

            <div className='configUser'>
                <Dropdown title={<FaUserGear size={42} />}>
                    <Dropdown.Menu title="Admin">
                        <Dropdown.Item >{nombre}</Dropdown.Item>
                        <Dropdown.Item onClick={handleEditClick}>Añadir producto</Dropdown.Item>
                        <Dropdown.Item onClick={LogOut}>Cerrar sesión</Dropdown.Item>
                        <Dropdown.Item onClick={eliminarUsuario}>Eliminar cuenta</Dropdown.Item>
                    </Dropdown.Menu>
                    <Dropdown.Item onClick={toggleDarkMode} className='switch' >Dark mode</Dropdown.Item>
                </Dropdown>
            </div>

            <Slider {...settings} className='carousel'>
                <div>
                    <img src="./img/1.png" style={{ width: '100%' }} />
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
                        <input
                            id='foto'
                            type="file"
                            name="foto"
                            accept="image/*"
                            placeholder='Foto'
                            onChange={handleChange} />
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