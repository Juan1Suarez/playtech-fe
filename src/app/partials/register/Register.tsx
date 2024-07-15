"use client";
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Switch from '@mui/material/Switch';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/navigation"
import { crearUsuarios, verUsuarios } from '../../services/Register';
import Usuario from '../../services/model/usuario.model';


export default function Register() {
    const router = useRouter();
    const navegarALogin = () => {
        router.push("login")

    }

    const navegarATerminos = () => {
        router.push("terminosYCondiciones")
    }
    
    const validationSchema = Yup.object().shape({
        nombre: Yup.string()
            .required('El nombre completo es requerido')
            .min(4, 'El nombre debe contener al menos 4 letras'),
        email: Yup.string()
            .required('El email es requerido')
            .matches(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/, 'Email invalido'),
        password: Yup.string()
            .required('La contraseña es requerida')
            .min(4, 'La contraseña debe contener al menos 4 caracteres'),
        terminos: Yup
            .bool()
            .oneOf([true], 'Debes aceptar los terminos y condiciones'),
    });

    return (

        <>
            <img className="play" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img>

           

            <Formik
                initialValues={{
                    nombre: '',
                    email: '',
                    password: '',
                    activo: 1,
                    terminos: false,
                    rolId: 2,
                }}
                validationSchema={validationSchema}
                onSubmit={async (values: Usuario, actions: any) => {
                    await crearUsuarios(values, router);
                }
                }
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
                        <h1 className='titulofield'>EMAIL</h1>
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
                            <Field className="form-check-input" type="checkbox" role="switch" name="terminos" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Acepto los <a className='terminosYCondiciones'  onClick={() => navegarATerminos()}>Terminos y condiciones</a></label>
                            <ErrorMessage name="terminos" component="div" className='colorcheck' />
                        </div>

                        <button className="boton" type="submit" disabled={isSubmitting}>Crear cuenta</button>


                        <div className="botonregylog">
                            <a onClick={() => navegarALogin()} type='button' className="link">Log-In</a>
                        </div>
                    </Form>

                )}

            </Formik>
        </>
    );
}