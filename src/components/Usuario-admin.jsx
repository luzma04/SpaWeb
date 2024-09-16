import { db } from '../credentials'; // Asegúrate de importar Firestore correctamente
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2'; // Importar SweetAlert

export function UsuarioAdmin() {
    const [usuarios, setUsuarios] = useState([]);
    const [rangoEditado, setRangoEditado] = useState({});

    // Función para obtener los usuarios desde Firestore
    const fetchUsuarios = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'usuarios'));
            const usuariosList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsuarios(usuariosList);
        } catch (error) {
            console.error('Error fetching usuarios: ', error);
        }
    };

    // Función para manejar el cambio de rango en el select
    const handleRangoChange = (userId, nuevoRango) => {
        setRangoEditado({
            ...rangoEditado,
            [userId]: nuevoRango
        });
    };

    // Función para guardar los cambios en Firestore
    const guardarCambios = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "Se guardarán los cambios de los rangos",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, guardar cambios'
        });

        if (result.isConfirmed) {
            const promises = Object.keys(rangoEditado).map(async (userId) => {
                const nuevoRango = rangoEditado[userId];
                const userDoc = doc(db, 'usuarios', userId);
                await updateDoc(userDoc, { rango: nuevoRango });

                // Actualizar localmente el rango del usuario modificado
                setUsuarios((prevUsuarios) => prevUsuarios.map((usuario) =>
                    usuario.id === userId ? { ...usuario, rango: nuevoRango } : usuario
                ));
            });

            try {
                await Promise.all(promises);
                Swal.fire('¡Guardado!', 'Los rangos han sido actualizados.', 'success');
                setRangoEditado({}); // Limpiar el estado después de guardar
            } catch (error) {
                Swal.fire('Error', 'Hubo un problema al actualizar los rangos.', 'error');
            }
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    return (
        <div>
            <h1>Administración de Usuarios</h1>
            <ul>
                {usuarios.map(usuario => (
                    <li key={usuario.id}>
                        <h3>Email: {usuario.email}</h3>
                        <p>Rango actual: {usuario.rango}</p>

                        <select
                            value={rangoEditado[usuario.id] || usuario.rango}
                            onChange={(e) => handleRangoChange(usuario.id, e.target.value)}
                        >
                            <option value="Cliente">Cliente</option>
                            <option value="Administrador">Administrador</option>
                        </select>
                    </li>
                ))}
            </ul>

            {/* Mostrar el botón de "Guardar cambios" solo si hay cambios */}
            {Object.keys(rangoEditado).length > 0 && (
                <button onClick={guardarCambios}>Guardar cambios</button>
            )}
        </div>
    );
}