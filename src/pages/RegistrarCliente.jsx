import React, {useState} from 'react';
import Card from '../components/cards/Card';
import ConstructionCard from '../components/cards/ConstructionCard';
import axios from 'axios';
import {userService} from '../Url'

const RegistrarCliente = () => {

    const[obrasId, setObrasId]=useState(1)

    const [newClient, setNewClient] = useState({
        user:{
            "tipoUsuario":{
                "id":2
            }
        },
        obras: [{"id":obrasId-1}]
    });

    //funcion auxiliar para actualizar el user dentro de newClient
    const setTipoUsuario = (prop, value) => {
        let user = newClient.user;
        user[prop] = value;
        setNewClient({...newClient, user})
    }

    //funcion que se dispara cada vez que hay un cambio en una obra
    //recibe el evento (de donde saca el value), el prop (que campo cambio) y el id
    //encontrar esa obra en particular en el listado
    const updateObra = (event, prop, id) => {
        //busco cual es el id de la obra a actualizar
        const obraIndex = newClient.obras.findIndex(obra => obra.id === id)
        const obrasCopy = [...newClient.obras]
        //actualizo ese dato de esa obra con el valor del evento
        obrasCopy[obraIndex][prop] = event.target.value;
        //"piso" el valor de la obra con lo mas nuevo
        setNewClient({...newClient,obras:obrasCopy})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(newClient);
        axios.post(userService+'/cliente', newClient)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            //ver que hacer en este caso
            console.log(error);
        })
    }

    const handleAddConstruction = (event) => {
        event.preventDefault();
        setObrasId(obrasId+1);
        setNewClient({...newClient, obras: [...newClient.obras, {"id":obrasId}]})
    }

    const handleDeleteConstruction = (index) => {
        const obrasCopy = [...newClient.obras]
        obrasCopy.splice(index, 1);
        setNewClient({...newClient, obras: obrasCopy})
    }

    const ConstructionsList = newClient.obras.map((obra, index) => (
        <ConstructionCard
            key={obra.id}
            onDelete = {() => handleDeleteConstruction(index)}
            updateObra = {(event, prop) => updateObra(event, prop, obra.id)}
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
