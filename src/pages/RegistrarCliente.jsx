import React, {useState, useRef} from 'react';
import Card from '../components/cards/Card';
import ConstructionCard from '../components/cards/ConstructionCard';
import axios from 'axios';
import {userService} from '../Url'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast';

const RegistrarCliente = ({history}) => {

    const[loading, setLoading] = useState(false)
    const toast = useRef(null);

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

    const showError = (message) => {
        toast.current.show({severity:'error', summary: 'Error', detail:message, life: 3000});
    }

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
                setLoading(true);
                console.log("VALIDO");
                axios.post(userService+'/cliente', newClient)
                .then(function (response) {
                    //Ver que hago aca
                    console.log(response);
                    history.replace("/")
                    setLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                    showError('No se pudo guardar el cliente, intentelo mas tarde')
                    setLoading(false);
                })
            }else{
                showError('FALTAN LLENAR CAMPOS')
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
                <Toast ref={toast} />
                <h3>Datos del usuario</h3>
                <label className="form-label">Usuario</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Usuario"
                    onChange={(event) => setTipoUsuario("user", event.target.value)}
                />
                <label className="form-label">Contraseña</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    onChange={(event) => setTipoUsuario("password", event.target.value)}
                />
                <label className="form-label">Razon social</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Razon social"
                    onChange={(event) => setNewClient({...newClient, "razonSocial": event.target.value})}
                />
                <label className="form-label">CUIT</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="CUIT"
                    onChange={(event) => setNewClient({...newClient, "cuit": event.target.value})}
                />
                <label className="form-label">Mail</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Mail"
                    onChange={(event) => setNewClient({...newClient, "mail": event.target.value})}
                />
            </Card>
            <Card>
                <h3>Obras</h3>
                {ConstructionsList}
                <div className="">
                    <Button className="btn btn-primary" onClick={(event)=>handleAddConstruction(event)}>Agregar obra</Button>
                </div>
                <hr/>
                <div className="d-flex justify-content-between">
                    <Button className="p-button-danger" onClick={(event)=> handleCancel(event)} label="Cancelar"></Button>
                    <Button type="submit" className="btn btn-primary" icon="pi pi-check" label="Guardar" loading={loading}></Button>
                </div>
            </Card>
        </form>
    )
}

export default RegistrarCliente
