import React, {useState, useRef} from 'react'
import MaterialCard from '../components/cards/MaterialCard'
import Card from '../components/cards/Card'
import axios from 'axios'
import {productService} from '../Url'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast';

const RegistrarMaterial = ({history}) => {

    const[loading, setLoading] = useState(false)
    const toast = useRef(null);

    const[material, setMaterial] = useState({})

    const showError = (message) => {
        toast.current.show({severity:'error', summary: 'Error', detail:message, life: 3000});
    }

    const validMaterial = () => {
        return material.nombre && material.descripcion && material.precio && material.stockActual && material.stockMinimo && material.unidad
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(validMaterial()){
            setLoading(true);
            axios.post(productService+'/material', material)
            .then(function (response) {
                //Ver que hago aca
                console.log(response);
                history.push("/")
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
        history.push("/")
    }

    return (
        <Card title='Registrar un nuevo material'
        footer={
            <div className="d-flex justify-content-between">
                <Button className="p-button-danger" onClick={(event)=> handleCancel(event)} label="Cancelar"></Button>
                <Button type="submit" className="btn btn-primary" onClick={(event)=>handleSubmit(event)} icon="pi pi-check" label="Guardar" loading={loading}></Button>
            </div>
        }>
            <Toast ref={toast} />
            <MaterialCard
                updateMaterial = {(event, prop) => setMaterial({...material, [prop]:event.target.value})}
            />
            
        </Card>
    )
}

export default RegistrarMaterial
