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

    const showToast = (summary, message, severity) => {
        toast.current.show({severity:severity, summary: summary, detail:message, life: 3000});
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
                setLoading(false);
                showToast('Exito!','Cliente creado correctamente','success')
                history.push("/")
            })
            .catch(function (error) {
                //ver que hacer en este caso
                console.log(error);
                showToast('Error','No se pudo guardar el cliente, intentelo mas tarde','error')
                setLoading(false);
            })
        }else{
            showToast('Error','FALTAN LLENAR CAMPOS','warn')
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        history.push("/")
    }

    return (
        <Card title="Registrar una obra"
        footer = {
            <div className="d-flex justify-content-between">
                <Button className="p-button-danger" onClick={(event)=> handleCancel(event)} label="Cancelar"></Button>
                <Button type="submit" className="btn btn-primary" onClick={(event)=>handleSubmit(event)} icon="pi pi-check" label="Guardar" loading={loading}></Button>
            </div>
        }>
            <Toast ref={toast} />
            <ConstructionCard
                updateObra = {(event, prop) => updateObra(event, prop)}
            />
        </Card>
    )
}

export default RegistrarObra
