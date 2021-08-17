import React, {useState, useRef} from 'react'
import ConstructionCard from '../components/cards/ConstructionCard'
import Card from '../components/cards/Card'
import axios from 'axios'
import {userService} from '../Url'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast';

const RegistrarObra = ({history}) => {

    const[loading, setLoading] = useState(false)
    const toast = useRef(null);

    const [obra, setObra] = useState({
        "tipo":{
            "descripcion":""
        }
    })

    const showError = (message) => {
        toast.current.show({severity:'error', summary: 'Error', detail:message, life: 3000});
    }

    const updateObra = (event, prop) => {
        const obraCopy = {...obra}
        if(prop==="tipo"){
            obraCopy["tipo"] = {"descripcion": event.target.value};
        }else{
            obraCopy[prop] = event.target.value;
        }
        setObra(obraCopy)
        console.log(obra)
    }

    const validObra = () => {
        return obra.descripcion && obra.latitud && obra.longitud && obra.direccion && obra.superficie && obra.tipo.descripcion
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(validObra()){
            setLoading(true);
            axios.post(userService+'/obra', obra)
            .then(function (response) {
                //Ver que hago aca
                console.log(response);
                history.replace("/")
                setLoading(false);
            })
            .catch(function (error) {
                //ver que hacer en este caso
                console.log(error);
                showError('No se pudo guardar el cliente, intentelo mas tarde')
                setLoading(false);
            })
        }else{
            showError('FALTAN LLENAR CAMPOS')
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        history.replace("/")
    }

    return (
        <Card>
            <Toast ref={toast} />
            <h3>Registrar una obra</h3>
            <ConstructionCard
                updateObra = {(event, prop) => updateObra(event, prop)}
            />
            <div className="d-flex justify-content-between">
                <Button className="p-button-danger" onClick={(event)=> handleCancel(event)} label="Cancelar"></Button>
                <Button type="submit" className="btn btn-primary" onClick={(event)=>handleSubmit(event)} icon="pi pi-check" label="Guardar" loading={loading}></Button>
            </div>
        </Card>
    )
}

export default RegistrarObra
