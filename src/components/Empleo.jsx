import uploadIcon from '../assets/icons/icono-upload.svg';
import logoVersion3 from '../assets/icons/logoVersion3.svg';
import { useForm } from 'react-hook-form';
import { db, storage } from '../credentials';
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import 'css/empleo.css';

export function Empleo() {
    const { register, handleSubmit, setValue } = useForm();
    const [mensaje, setMensaje] = useState('');
    const [mensajeError, setMensajeError] = useState('');

    const enviar = async (data) => {
        try {
            // Para enviar archivos hay que configurar permisos raros, lo hago después
            /* const cvFile = data.cv[0];
            const storageRef = ref(storage, `cvs/${cvFile.name}`);
            const snapshot = await uploadBytes(storageRef, cvFile);
            const downloadURL = await getDownloadURL(snapshot.ref);

            // Añadir la URL del CV a los datos antes de guardarlos en Firestore
            const formDataWithCV = {
                ...data,
                cvURL: downloadURL,
            }; */
            const solicitudesRef = collection(db, "solicitudesEmpleo");
            await addDoc(solicitudesRef, data);

            setMensaje('¡Solicitud enviada correctamente!');
            setMensajeError('');
            // Limpiar el formulario si es necesario
            setValue('name', '');
            setValue('email', '');
            setValue('message', '');
            setValue('cv', '');
        } catch (error) {
            setMensaje('');
            setMensajeError('Error al enviar la solicitud. Por favor, intenta de nuevo.');
            console.error("Error al enviar la solicitud: ", error);
        }
    }

    return (
        <section className="empleo">
            <h2>¡Trabajá con nosotros!</h2>
            <div className="empleo-contenedor">
                <form id="empleo-form" onSubmit={handleSubmit(enviar)}>
                    <label htmlFor="name">Nombre</label>
                    <input className="empleo-inputs" type="text" id="name" name="name" required {...register("name")}/>
                    
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required className="empleo-inputs" {...register("email")}/>
                    
                    <label htmlFor="mensaje">Mensaje</label>
                    <textarea className="empleo-inputs" id="mensaje" name="mensaje" rows="4" cols="50" placeholder="Escribe tu mensaje aquí..." {...register("message")}></textarea>
                    
                    <div className="upload-cv">
                        <img src={uploadIcon} alt="Upload Icon" />
                        <label htmlFor="cv-pic" className="file-upload-cv">Adjunta tu CV (.pdf)</label>
                        <input type="file" id="cv-pic" name="cv-pic" accept="application/pdf" required /*{...register("cv")}*//>
                    </div>
                </form>
                
                <img src={logoVersion3} alt="Company Logo" />
                
                <div className="enviar-boton-container">
                    <input type="submit" value="Enviar" className="boton-enviar" form="empleo-form" />
                </div>
                {mensaje && <div className="mensaje-exito">{mensaje}</div>}
                {mensajeError && <div className="mensaje-error">{mensajeError}</div>}
            </div>
        </section>
    );
}