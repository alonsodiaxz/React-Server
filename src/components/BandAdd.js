import React, { useState } from 'react'


export const BandAdd = ({crearBanda}) => {

    const [valor, setValor] = useState(''); //variable de estado, incialmente vacía.

    const onSubmit = (ev) => { //Método que se activará cuando el usuario presione la tecla enter (submit)

        ev.preventDefault(); //Evitar propagación del formulario, comportamiento por defecto.
        console.log( valor); //Una vez se escribe en el formulario, el método onchange capta el texto y con el método setValor se cambia el contenido de la variable de estado.
        
        if(valor.trim().length > 0){

            crearBanda(valor);
            setValor('');
        }

    }

    return (
        <>

            <h3> Agregar banda</h3>
            <form onSubmit={onSubmit}> 
                <input 
                className="form-control" 
                placeholder="Nuevo nombre de banda"
                value = {valor}
                onChange={ (ev) => setValor(ev.target.value)}
                />
            </form>
            
        </>
    )
}


