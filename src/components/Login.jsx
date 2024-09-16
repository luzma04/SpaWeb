import 'css/login.css';
import userIcon from '../assets/icons/iconoUser.svg';
import {useForm} from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';

import appFirebase, { db } from '../credentials';
import useUsuario from '../hooks/useUsuario';

export function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const auth = getAuth(appFirebase);
    const usuario = useUsuario();

    

    // console.log(usuario);
    const enviar = async (data) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
            // console.log('User signed in:', userCredential.user);
        } catch (error) {
            // console.error('Error signing in:', error.message);//crear alert
        }
    }
    return (
        <section className="login">
            <div className="login-contenedor">
                <img src={userIcon} className="user-image" alt="User Icon" />
                <form onSubmit={handleSubmit(enviar)}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required {...register("email")}/>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" name="password" required {...register("password")}/>
                    
                    <div className="register-link">
                        <p>¿No tenes cuenta?</p>
                        <a href="register.html">Registrate</a>
                    </div>
                    
                    <div className="login-boton-container">
                        <input type="submit" value="Ingresar" className="boton-ingresar" />
                    </div>
                </form>
            </div>
        </section>
    );
}