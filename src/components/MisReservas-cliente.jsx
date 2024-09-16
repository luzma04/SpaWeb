import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../credentials';  // Importar Firestore desde credentials
import useUsuario from '../hooks/useUsuario';  // Importar el hook personalizado

export function MisReservas() {
    const usuario = useUsuario();  // Usar el hook personalizado
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener las reservas del usuario desde Firebase
    const fetchReservas = async () => {
        try {
            if (!usuario || !usuario.idUser) {
                setError('Primero debes iniciar sesión');
                setLoading(false);
                return;
            }

            // Hacer la consulta a Firestore para obtener las reservas del usuario
            const reservasRef = collection(db, "reservasServicios");
            const q = query(reservasRef, where("cliente.uid", "==", usuario.idUser));
            const querySnapshot = await getDocs(q);

            // Crear una lista para almacenar las reservas
            const reservasList = [];
            querySnapshot.forEach((doc) => {
                reservasList.push({ id: doc.id, ...doc.data() });
            });

            // Actualizar el estado con las reservas obtenidas
            setReservas(reservasList);
            setLoading(false);
        } catch (error) {
            setError('Error al obtener las reservas');
            setLoading(false);
        }
    };

    // Ejecutar la consulta solo cuando el usuario esté disponible
    useEffect(() => {
        if (usuario !== undefined) {  // Esperar a que el hook `useUsuario` devuelva un valor (null o un usuario)
            fetchReservas();
        }
    }, [usuario]);

    if (loading) {
        return <p>Cargando tus reservas...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (reservas.length === 0) {
        return <p>No tienes reservas actualmente.</p>;
    }

    return (
        <div id="misReservas">
            <h2>Mis Reservas</h2>
            <div id="reservasContainer">
                {reservas.map((reserva) => (
                    <div key={reserva.id} className="reserva">
                        <h3>Reserva para el {reserva.fecha}</h3>
                        <p>Horario: {reserva.horario}</p>
                        <p>Servicios: {reserva.services.join(", ")}</p>
                        <p>Costo Total: ${reserva.costoTotal}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}