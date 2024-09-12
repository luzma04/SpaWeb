import React, { useState, useEffect } from 'react';
import Select from 'react-select';

export function HorarioSelect({ options, clearValue }) {
    const [value, setValue] = useState(null);

    // Efecto que escucha cambios en clearValue para limpiar el estado
    useEffect(() => {
        if (clearValue) {
            setValue(null); // Limpia la selección
        }
    }, [clearValue]);

    return (
        <>
            {value && (
                <input type="hidden" id="horarioInputID" name="horario" value={value.value} />
            )}

            <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={false}
                isDisabled={false}
                name="horario"
                options={options}
                onChange={setValue}
                value={value} // Mantén el estado del valor actualizado
                placeholder="Seleccionar horario"
            />
        </>
    );
};