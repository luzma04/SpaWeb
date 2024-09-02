import React from 'react';
import { useForm } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import 'css/register.css';
import userIcon from '../assets/icons/iconoUser.svg';
import uploadIcon from '../assets/icons/icono-upload.svg';
import appFirebase from '../credentials';

export function Register() {
    const { register, handleSubmit, setError, clearErrors } = useForm();
    const auth = getAuth(appFirebase);
    const [mensaje, setMensaje] = React.useState('');
    const [mensajeError, setMensajeError] = React.useState('');

    const enviar = async (data) => {
        const {email, password } = data;
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setMensaje('¡Registro exitoso!');
            setMensajeError('');
            clearErrors();
        } catch (error) {
            setMensaje('');
            setMensajeError('Error al registrar el usuario. Intenta de nuevo.');
            console.error("Error al registrar el usuario: ", error);
        }
    };
    return (
        <section className="register">
            <div className="register-contenedor">
                <img src={userIcon} className="user-image" alt="User Icon" />
                <form id="register-form" onSubmit={handleSubmit(enviar)}>

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required {...register("email")}/>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" name="password" required {...register("password")}/>
                    {mensaje && <div className="mensaje-exito">{mensaje}</div>}
                    {mensajeError && <div className="mensaje-error">{mensajeError}</div>}
                </form>
                <div className="upload-pic">
                    <img src={uploadIcon} alt="Upload Icon" />
                    <label htmlFor="profile-pic" className="custom-file-upload">Cargar foto de perfil</label>
                    <input type="file" id="profile-pic" name="profile-pic" accept="image/*" />
                </div>
                
                <div className="register-boton-container">
                    <input form="register-form" type="submit" value="Registrarse" className="boton-ingresar" />
                </div>
                
            </div>
            
        </section>
    );
}