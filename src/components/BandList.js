import React, { useEffect, useState } from 'react'
import { BandAdd } from './BandAdd';

export const BandList = ({data, votar, borrar, cambiarNombre}) => {

    const [bands,setBands] = useState(data)

    //Actuzalizar la data
    useEffect (() => {
        setBands(data);
    }, [data])

    const cambioNombre = (event, id) =>{
        const nuevoNombre = event.target.value;

        setBands( bands => bands.map( band =>{

            if(band.id == id){

                band.name = nuevoNombre;    
            }
            return band;
        })); 
        
    }

    const onPerdioFoco = (id, nombre) => {
        console.log(id, nombre);
        cambiarNombre(id, nombre);

    }

    const crearRows = () => {
        
        return (
            bands.map( band => (
                    
            <tr key={band.id}>
                <td> 
                    <button 
                    className="btn btn-primary"
                    onClick= {() => votar(band.id)}
                    > Sumar </button>
                </td>
                <td> 
                    <input 
                    className="form-control" 
                    value={band.name}
                    onChange= {(event) => cambioNombre(event, band.id)} //Cada vez que se añada o se quite algo del input. Se almacena en event.
                    onBlur = {() => onPerdioFoco(band.id, band.name)} //Cuando pierde el foco, es decir, cuando seleccionas otro componente o cosa.
                    />
                </td>
                <td> <h3> {band.votos}</h3></td>
                <td> 
                    <button 
                    className="btn btn-danger"
                    onClick={() => borrar(band.id)}
                    > Borrar</button>
                </td>
            </tr>
            ))
        );
        
    }
    return (
        <>
            <h3> Band List</h3>
            <table className="table table-stripped">
                <thead>
                    <tr> 
                        <th></th>
                        <th> Nombre  </th>
                        <th> Votos</th>
                        <th> Borrar</th>
                    </tr>
                </thead>
                <tbody>

                    {crearRows ()}

                </tbody>
            </table>
        </>
    )
}
