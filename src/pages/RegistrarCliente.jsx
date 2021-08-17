import React, {useState} from 'react';
import Card from '../components/cards/Card';
import ConstructionCard from '../components/cards/ConstructionCard';
import axios from 'axios';
import {userService} from '../Url'

const RegistrarCliente = ({history}) => {

    const[obrasId, setObrasId]=useState(1)

    const [newClient, setNewClient] = useState({
        user:{
            "tipoUsuario":{
                "id":2
            }
        },
        obras: [{
            "id":obrasId-1,
            "tipo":{
                "descripcion":""
            }
        }]
    });

    //funcion auxiliar para actualizar el user dentro de newClient
    const setTipoUsuario = (prop, value) => {
        let user = newClient.user;
        user[prop] = value;
        setNewClient({...newClient, user})
    }

    //funcion que se dispara cada vez que hay un cambio en una obra
    //recibe el evento (de donde saca el value), el prop (que campo cambio) y el id
    //para encontrar esa obra en particular en el listado
    const updateObra = (event, prop, id) => {
        const obraIndex = newClient.obras.findIndex(obra => obra.id === id)
        const obrasCopy = [...newClient.obras]
        if(prop==="tipo"){
            obrasCopy[obraIndex]["tipo"] = {"descripcion": event.target.value};
        }else{
            obrasCopy[obraIndex][prop] = event.target.value;
        }
        setNewClient({...newClient,obras:obrasCopy})
    }

    //Valido que ningun campo es vacio
    const validForm = () =>{
        let validObras = newClient.obras.every(obra => validObra(obra))
        return validObras && newClient.razonSocial && newClient.cuit && newClient.mail && newClient["user"]["user"] && newClient["user"]["password"];
    }

    const validObra = (obra) => {
        return obra.descripcion && obra.latitud && obra.longitud && obra.direccion && obra.superficie && obra.tipo.descripcion
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(newClient);
        if(newClient.obras.length===0){
            alert("Debe tener al menos una obra");
        }else{
            if(validForm()){
                console.log("VALIDO");
                axios.post(userService+'/cliente', newClient)
                .then(function (response) {
                    //Ver que hago aca
                    console.log(response);
                    history.replace("/")
                })
                .catch(function (error) {
                    //ver que hacer en este caso
                    console.log(error);
                    alert("No se pudo guardar el cliente, intente mas tarde");
                    history.replace("/")
                })
            }else{
                alert("FALTAN LLENAR CAMPOS");
            }
        }
    }

    const handleAddConstruction = (event) => {
        event.preventDefault();
        setObrasId(obrasId+1);
        setNewClient({...newClient, obras: [...newClient.obras, {"id":obrasId, "tipo":{"descripcion":""}}]})
    }

    const handleDeleteConstruction = (index) => {
        const obrasCopy = [...newClient.obras]
        obrasCopy.splice(index, 1);
        setNewClient({...newClient, obras: obrasCopy})
    }

    const handleCancel = (event) => {
        event.preventDefault();
        history.replace("/")
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
                <div class="">
                    <button class="btn btn-primary" onClick={(event)=>handleAddConstruction(event)}>Agregar obra</button>
                </div>
                <hr/>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-danger" onClick={(event)=> handleCancel(event)}>Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
            </Card>
        </form>
    )
}

export default RegistrarCliente
