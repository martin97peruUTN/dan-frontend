import React, {useState} from 'react'
import MaterialCard from '../components/cards/MaterialCard'
import Card from '../components/cards/Card'
import axios from 'axios'
import {productService} from '../Url'

const RegistrarMaterial = ({history}) => {

    const[material, setMaterial] = useState({})

    const validMaterial = () => {
        return material.nombre && material.descripcion && material.precio && material.stockActual && material.stockMinimo && material.unidad
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(validMaterial()){
            axios.post(productService+'/material', material)
            .then(function (response) {
                //Ver que hago aca
                console.log(response);
                history.replace("/")
            })
            .catch(function (error) {
                //ver que hacer en este caso
                console.log(error);
                alert("No se pudo guardar el material, intente mas tarde");
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
            <h3>Registrar un nuevo material</h3>
            <MaterialCard
                updateMaterial = {(event, prop) => setMaterial({...material, [prop]:event.target.value})}
            />
            <div class="d-flex justify-content-between">
                <button class="btn btn-danger" onClick={(event)=> handleCancel(event)}>Cancelar</button>
                <button type="submit" class="btn btn-primary" onClick={(event)=>handleSubmit(event)}>Guardar</button>
            </div>
        </Card>
    )
}

export default RegistrarMaterial
