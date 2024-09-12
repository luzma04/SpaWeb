import React, { useState } from 'react';
import Select from 'react-select';
export function HorarioSelect({ options }) {
    const [value, setValue] = useState(null);
    return (
        <>
            <input type="hidden" name="horario" value={value?.value || ""} />

            <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={false}
                isDisabled={false}
                name="color"
                options={options}
                onChange={setValue}
                placeholder="Seleccionar horario"
            />
        </>
    );
};