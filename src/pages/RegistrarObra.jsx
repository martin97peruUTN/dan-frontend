import React, {useState} from 'react'
import ConstructionCard from '../components/cards/ConstructionCard'
import Card from '../components/cards/Card'
import axios from 'axios'
import {userService} from '../Url'

const RegistrarObra = ({history}) => {

    const [obra, setObra] = useState({
        "tipo":{
            "descripcion":""
        }
    })

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
            axios.post(userService+'/obra', obra)
            .then(function (response) {
                //Ver que hago aca
                console.log(response);
                history.replace("/")
            })
            .catch(function (error) {
                //ver que hacer en este caso
                console.log(error);
                alert("No se pudo guardar la obra, intente mas tarde");
                //history.replace("/")
            })
        }else{
            alert("FALTAN LLENAR CAMPOS");
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        history.replace("/")
    }

    return (
        <Card>
            <h3>Registrar una obra</h3>
            <ConstructionCard
                updateObra = {(event, prop) => updateObra(event, prop)}
            />
            <div class="d-flex justify-content-between">
                <button class="btn btn-danger" onClick={(event)=> handleCancel(event)}>Cancelar</button>
                <button type="submit" class="btn btn-primary" onClick={(event)=>handleSubmit(event)}>Guardar</button>
            </div>
        </Card>
    )
}

export default RegistrarObra
