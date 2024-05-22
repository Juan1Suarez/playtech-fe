"use client";
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import { verUsuarios } from '../../services/Login';
import { useRouter } from "next/navigation"
import 'bootstrap/dist/css/bootstrap.min.css';
import darkMode from  "../../partials/register/Register"


export default function Home() {
  const router = useRouter();
  const navegarARegister = () => {
<<<<<<< HEAD
    router.push("register")
  }


=======
      router.push("register")
  }
  
>>>>>>> c844ef7dd80796e72ff8a3cc018603696f2b89e1
  const [value, setValue] = React.useState<number | null>(5);


  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
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
<<<<<<< HEAD
=======
    
    <>
      <h1 className="titulo">Bienvenidos a Play-Tech!</h1>
      <h2 className='titulo'>Inicia sesion a nuestra pagina para poder ver nuestros productos</h2>
>>>>>>> c844ef7dd80796e72ff8a3cc018603696f2b89e1

    <>

      <img className="play" src='./img/playtech.png'></img>
      <img className="triangulossuben" src='./img/flechasube.png'></img>
      <img className="triangulosbajan" src='./img/flechabaja.png'></img>
      <Formik
        initialValues={{
          fullname: '',
          email: '',
          password: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.resetForm();
          actions.setSubmitting(false);
          alert(JSON.stringify(values, null, 2));
        }}
      >

        {({ isSubmitting }) => (
          <Form className='form'>
            <h1 className="login">Log-In</h1>
            <h1 className='titulofield'>GMAIL</h1>
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

<<<<<<< HEAD
          

            <button className="boton" type="submit" disabled={isSubmitting}>Iniciar sesion</button>

            <div className="boton2">
              <a onClick={() => navegarARegister()} type='button' className="link">Register</a>
            </div>

          </Form>
        )}
      </Formik>
    
=======
            <button className="boton" type="submit" disabled={isSubmitting}>Enviar</button>
            
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button onClick={() => navegarARegister()} type="button" className="btn">Register</button>
                        </div>
            
            </Form>
      )}
      </Formik>
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


<div className='switch'>Dark mode</div>
<Switch  onChange={darkMode} className='switch2' />

>>>>>>> c844ef7dd80796e72ff8a3cc018603696f2b89e1
    </>

  );
}