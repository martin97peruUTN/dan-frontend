import React, {useState, useRef} from 'react';
import Card from '../components/cards/Card';
import ConstructionCard from '../components/cards/ConstructionCard';
import axios from 'axios';
import {userService} from '../Url'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { InputMask } from 'primereact/inputmask';

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
                    history.push("/")
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
        history.push("/")
    }

    const ConstructionsList = newClient.obras.map((obra, index) => (
        <ConstructionCard
            key={obra.id}
            onDelete = {() => handleDeleteConstruction(index)}
            updateObra = {(event, prop) => updateObra(event, prop, obra.id)}
        />
    ))

    return (
        <div>
            <Card title='Datos del usuario'>
                <Toast ref={toast} />
                <span className="p-float-label">
                    <InputText id="user" className='w-full' onChange={(event) => setTipoUsuario("user", event.target.value)} />
                    <label htmlFor="user">Usuario</label>
                </span>
                <br/>
                <span className="p-float-label">
                    <Password id="password" className='w-full' inputClassName='w-full' feedback={false} toggleMask onChange={(event) => setTipoUsuario("password", event.target.value)} />
                    <label htmlFor="password">Contraseña</label>
                </span>
                <br/>
                <span className="p-float-label">
                    <InputText id="razonSocial" className='w-full' onChange={(event) => setNewClient({...newClient, "razonSocial": event.target.value})} />
                    <label htmlFor="razonSocial">Razon social</label>
                </span>
                <br/>
                <span className="p-float-label">
                    <InputMask id="cuit" className='w-full' mask="99-99999999-9" value={newClient.cuit} onChange={(event) => setNewClient({...newClient, "cuit": event.target.value})} />
                    <label htmlFor="cuit">CUIT</label>
                </span>
                <br/>
                <span className="p-float-label">
                    <InputText id="mail" className='w-full' keyfilter="email" onChange={(event) => setNewClient({...newClient, "mail": event.target.value})} />
                    <label htmlFor="mail">Mail</label>
                </span>
            </Card>
            <Card title='Obras'
                footer={
                <div>
                    <Button className="btn btn-primary" onClick={(event)=>handleAddConstruction(event)}>Agregar obra</Button>
                    <Divider/>
                    <div className="flex justify-content-between">
                        <Button className="p-button-danger" onClick={(event)=> handleCancel(event)} label="Cancelar"></Button>
                        <Button type="submit" className="btn btn-primary" icon="pi pi-check" onClick={(event)=> handleSubmit(event)} label="Guardar" loading={loading}></Button>
                    </div>
                </div>
                }>
                {ConstructionsList}
            </Card>
        </div>
    )
}

export default RegistrarCliente
