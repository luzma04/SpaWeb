import { useState } from "react"
import {Calendar} from "react-multi-date-picker"
import 'dayjs/locale/es'; // Importa el idioma español
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat'; // Plugin para formatos localizados
import spanish_es_lowercase from './localeCalendarEspanol'; // Importa el idioma español para el calendario

// Extiende dayjs con el plugin y establece el idioma
dayjs.extend(localizedFormat);
dayjs.locale('es'); // Establece el idioma a español



export function DateCalendarMultipleSelect() {
  const today = dayjs().toDate(); 
  
  const [values, setValues] = useState([]);

  return (
    <>
    <input type="hidden" name="calendar-days"value={values} />
    <Calendar 
      multiple
      value={values}
      locale={spanish_es_lowercase}
      onChange={setValues}
      minDate={today}
      maxDate={dayjs(today).add(6, 'months').toDate()}
      className="custom-calendar"
    />
    </>
  );
}