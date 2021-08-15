import React, {useState, useEffect} from 'react';
import Card from '../components/cards/Card';
import ConstructionCard from '../components/cards/ConstructionCard';
import axios from 'axios';
import {userService} from '../Url'

const RegistrarCliente = () => {

    const [newClient, setNewClient] = useState({
        user:{
            "tipoUsuario":{
                "id":2
            }
        },
        obras: [{}]
    });

    //funcion auxiliar para actualizar el user dentro de newClient
    const setTipoUsuario = (prop, value) => {
        let user = newClient.user;
        user[prop] = value;
        setNewClient({...newClient, user})
    }

    const setObra = (prop, value) => {

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(newClient);
        axios.post(userService+'/cliente', newClient)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const handleAddConstruction = (event) => {
        event.preventDefault();
        setNewClient({...newClient, obras: [...newClient.obras, {}]})
    }

    const handleDeleteConstruction = (index) => {
        const obrasCopy = [...newClient.obras]
        obrasCopy.splice(index, 1);
        setNewClient({...newClient, obras: obrasCopy})
    }

    const ConstructionsList = newClient.obras.map((obra, index) => (
        <ConstructionCard
            key={index}
            obra = {obra}
            setObra = {setObra}
            newClient = {newClient}
            setNewClient = {setNewClient}
            onDelete = {() => handleDeleteConstruction(index)}
        />
    ))

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <h3>Datos del usuario</h3>
                <label class="form-label">Usuario</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Usuario"
                    onChange={(event) => setTipoUsuario("user", event.target.value)}
                />
                <label class="form-label">Contraseña</label>
                <input
                    type="password"
                    class="form-control"
                    placeholder="Contraseña"
                    onChange={(event) => setTipoUsuario("password", event.target.value)}
                />
                <label class="form-label">Razon social</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Razon social"
                    onChange={(event) => setNewClient({...newClient, "razonSocial": event.target.value})}
                />
                <label class="form-label">CUIT</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="CUIT"
                    onChange={(event) => setNewClient({...newClient, "cuit": event.target.value})}
                />
                <label class="form-label">Mail</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Mail"
                    onChange={(event) => setNewClient({...newClient, "mail": event.target.value})}
                />
            </Card>
            <Card>
                <h3>Obras</h3>
                {ConstructionsList}
                <button class="btn btn-primary" onClick={(event)=>handleAddConstruction(event)}>Agregar obra</button>
            </Card>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}

export default RegistrarCliente
