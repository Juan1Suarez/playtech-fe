"use client";
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/navigation"
import 'bootstrap/dist/css/bootstrap.min.css';
import { login } from '@/app/services/Login';
import Login from '../../services/model/login.model';

export default function Home() {
  const router = useRouter();
  const navegarARegister = () => {
    router.push("/register")
  }

  const navegarAMain = () => {
    router.push("/")
  }
  
  const validationSchema = Yup.object().shape({
   
    email: Yup.string()
      .required('El email es requerido')
      .matches(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/, 'Email invalido'),
    password: Yup.string()
      .required('La contraseña es requerida')
      .min(4, 'La contraseña debe contener al menos 4 caracteres'),
  });

  return (

    <>

      <img  onClick={() => navegarAMain()} className="play" src='./img/imagen_2024-05-22_195807468-removebg-preview.png'></img>
      
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values: Login, actions: any) => {
         await login(values, router)
        
        }}
      >

        {({ isSubmitting }) => (  
          <Form className='form'>
            <h1 className="login">Log-In</h1>
            <h1 className='titulofield'>EMAIL</h1>
            <Field className="field"
              type="string"
              name="email"
              placeholder="Introduzca su correo electronico"
            />
            <ErrorMessage name="email" component="div" className='color' />
            <h1 className='titulofield'>CONTRASEÑA</h1>
            <Field className="field"
              type="password"
              name="password"
              placeholder="Introduzca su contraseña"
            />
            <ErrorMessage name="password" component="div" className='color' />

            <button className="boton" type="submit" disabled={isSubmitting}>Iniciar sesion</button>

            <div className="botonregylog">
              <a onClick={() => navegarARegister()} type='button' className="link">Register</a>
            </div>

          </Form>
        )}
      </Formik>
    </>

  );
}