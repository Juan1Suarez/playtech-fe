"use client";
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/navigation"
import { crearUsuarios, verUsuarios } from '../../services/Login';
import Usuario from '../model/usuario.model';


export default function Register() {
    const router = useRouter();
    const navegarALogin = () => {
        router.push("login")
    }

    function darkMode() {
        var element = document.body;
        element.classList.toggle("darkMode");
     }

    const [value, setValue] = React.useState<number | null>(5);


    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('El nombre completo es requerido')
            .min(4, 'El nombre debe contener al menos 4 letras'),
        email: Yup.string()
            .required('El email es requerido')
            .matches(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/, 'Email invalido'),
        password: Yup.string()
            .required('La contraseña es requerida')
            .min(6, 'La contraseña debe contener al menos 6 caracteres'),
    });

    return (

        <>
<<<<<<< HEAD
=======
            <h1 className="titulo">Bienvenidos a Play-Tech! </h1>
            <h2 className='titulo'>Registrate a nuestra pagina para poder ver nuestros productos</h2>
>>>>>>> c844ef7dd80796e72ff8a3cc018603696f2b89e1

            <img className="play" src='./img/playtech.png' />
            <img className="triangulossuben" src='./img/flechasube.png'></img>
      <img className="triangulosbajan" src='./img/flechabaja.png'></img>
            <Formik
                initialValues={{
                    nombre: '',
                    email: '',
                    password: '',
                    activo: 1,
                    rolId: 2
                }}
                validationSchema={validationSchema}
                onSubmit={async (values: Usuario, actions) => {
                    try {
                        await crearUsuarios(values);
                        actions.resetForm();
                        alert('Usuario creado exitosamente');
                    } catch (error) {
                        console.error(error);
                        alert('Error al crear el usuario');
                    } finally {
                        actions.setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className='form'>
                        <h1 className="register">Register</h1>
                        <h1 className='titulofield'>NOMBRE</h1>
                        <Field className="field"
                            type="text"
                            name="nombre"
                            placeholder="Escriba su nombre completo"
                        />
                        <ErrorMessage name="nombre" component="div" className='color' />
                        <h1 className='titulofield'>GMAIL</h1>
                        <Field className="field"
                            type="text"
                            name="email"
                            placeholder="Introduzca su correo electronico"
                        />
                        <ErrorMessage name="email" component="div" className='color' />
                        <h1 className='titulofield'>CONTRASEÑA</h1>
                        <Field className="field"
                            type="password"
                            name="password"
                            placeholder="Cree su contraseña"
                        />
                        <ErrorMessage name="password" component="div" className='color' />

                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Acepto los T͟e͟r͟m͟i͟n͟o͟s͟ y͟ c͟o͟n͟d͟i͟c͟i͟o͟n͟e͟s͟</label>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">¡Quiero enterarme de las novedades!</label>
                        </div>

                        <button className="boton" type="submit" disabled={isSubmitting}>Crear cuenta</button>


                        <div className="boton2">
                            <a onClick={() => navegarALogin()} type='button' className="link">Log-In</a>
                        </div>
                    </Form>

                )}

            </Formik>
<<<<<<< HEAD
          
=======
            <Box
                className='rating'
                sx={{
                    '& > legend': { mt: 2 },
                }}
            >
                <Typography component="legend">¡Deja tu opinión!</Typography>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}


                />
            </Box>

            <div className='switch'>Dark M</div>
            <Switch  onChange={darkMode} className='switch2' />


>>>>>>> c844ef7dd80796e72ff8a3cc018603696f2b89e1
        </>
    );
}