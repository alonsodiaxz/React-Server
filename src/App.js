import React, {useEffect, useState} from 'react';
import io from "socket.io-client"; //Importación del socket del cliente, para conectarse al backend.
import {BandAdd} from './components/BandAdd';
import {BandList} from './components/BandList';


const connectSocketServer = () =>{
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket']  //Utilización de web socket para comunicar con el backend.
  });
  return socket;
}

function App() {

  //Use state, variables de estado
  const [socket] = useState(connectSocketServer());
  const [online, setonline] = useState(false); //Estado del socket
  const [bands, setBands ] = useState([]);

  //Determinar si estamos online u offline, gracias a useEffect. Es decir, conocer el estado del socket.
  useEffect(() => {
    console.log(socket);
    setonline(socket.connected);
  }, [socket])

  useEffect(() => {
    socket.on('connect',() => {
      setonline(true);
    })
  }, [socket])

  useEffect(() => {
    
    socket.on('disconnect',() => {
      setonline(false);
    })
  }, [socket])

  useEffect(() => {
    socket.on('current-bands',(bands) => {
        console.log(bands);
        setBands(bands);
    })
  }, [socket])

  const votar = (id) =>{
    console.log('votar - app ', id);
    socket.emit('votar-banda',id);
  }

  const borrar = (id) => {
    console.log('borrar - app', id);
    socket.emit('borrar-app', id);
  }

  const cambiarNombre = (id, nombre) => {
    console.log('CambiarNombre - app');
    socket.emit('cambiarNombre',{id, nombre});

  }

  const crearBanda = (nombre) => {

    socket.emit('crear-banda', {nombre});
  }


  return (
    <div className="container" >

      <div className="alert">

        <p>
          Service Status:
          {
            online
            ?<span className="text-success">Online </span>
            :<span className="text-danger">Offline </span>
          } 
        </p>

      </div>

      <h1> BandNames</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <BandList
              data={bands}
              votar={votar}
              borrar={borrar}
              cambiarNombre={cambiarNombre}
          />
        </div>
        <div className="col-4">
          <BandAdd
            crearBanda={crearBanda}
          />
        </div>
      </div>
      
    </div>
  );
}

export default App;
