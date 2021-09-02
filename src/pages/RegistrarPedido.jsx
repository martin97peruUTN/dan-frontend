import React, {useState, useEffect, useRef} from 'react'
import Card from '../components/cards/Card';
import { AutoComplete } from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button'
import axios from 'axios'
import {userService, orderService, productService} from '../Url'
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import DetailCard from '../components/cards/DetailCard';

import {useParams} from "react-router-dom"

const RegistrarPedido = ({history}) => {

    const {pedidoId} = useParams()

    const [loadingStart, setLoadingStart] = useState(true)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const toast = useRef(null);
    const [allClientes, setAllClientes] = useState([])
    const [filteredClientes, setFilteredClientes] = useState([])
    const [selectedCliente, setSelectedCliente] = useState()
    const [filteredObras, setFilteredObras] = useState([])
    const [selectedObra, setSelectedObra] = useState()
    const [allProductos, setAllProductos] = useState()
    const [date, setDate] = useState()
    const [detailsId, setDetailsId]=useState(1)
    const [details, setDetails] = useState([
        {
            "id": detailsId-1
        }
    ])

    const showToast = (summary, message, severity) => {
        toast.current.show({severity:severity, summary: summary, detail:message, life: 3000});
    }

    useEffect(() => {
        setLoadingStart(true)
        //va a venir el id del pedido cuando se quiera editar
        axios.get(userService+'/cliente').then((res) => {
            setAllClientes(res.data);
        })
        .catch(function (error) {
            showToast('Error','No se pudieron cargar los clientes, intentelo mas tarde','error')
            setTimeout(() => {
                history.push("/pedido-listado")
            }, 3000);
        })
        axios.get(productService+'/material').then((res) => {
            setAllProductos(res.data);
            setLoadingStart(false)
        })
        .catch(function (error) {
            showToast('Error','No se pudieron cargar los productos, intentelo mas tarde','error')
            setTimeout(() => {
                history.push("/pedido-listado")
            }, 3000);
        })
    }, [])

    useEffect(() => {
        //Si viene el id del pedido lleno los datos
        if(pedidoId){
            console.log('pedido con id: '+pedidoId)
            axios.get(orderService+'/pedido/'+pedidoId).then((res) => {
                setClienteYObra(res.data.obra.id)
                setDate(parseDate(res.data.fechaPedido))
                setDetails(res.data.detalle)
            })
            .catch(function (error) {
                showToast('Error','No se pudo cargar el pedido, intentelo mas tarde','error')
                setTimeout(() => {
                    history.push("/pedido-listado")
                }, 3000);
            })
        }else{
            console.log('sin id')
        }
    }, [allClientes])

    const setClienteYObra = (id) => {
        for(let i=0; i<allClientes.length; i++) {
            for(let j=0; j<allClientes[i].obras.length; j++) {
                if(allClientes[i].obras[j].id === id) {
                    setSelectedCliente(allClientes[i])
                    setSelectedObra(allClientes[i].obras[j])
                    return null
                }
            }
        }
        console.log('NO SE ENCONTRO')
    }

    const parseDate = (dateJson) => {
        const dateReturn = new Date(JSON.parse(`"${dateJson}"`));
        return dateReturn;
    }

    const updateDetail = (event, prop, id) => {
        const index = details.findIndex(details => details.id===id)
        const detailsCopy = [...details]
        detailsCopy[index][prop] = event.target.value;
        setDetails(detailsCopy)
    }

    const handleDeleteDetail = (index) => {
        const detailsCopy = [...details]
        detailsCopy.splice(index, 1)
        setDetails(detailsCopy)
    }

    const handleAddDetail = (event) => {
        event.preventDefault();
        setDetailsId(detailsId+1)
        setDetails([...details, {"id": detailsId}])
    }

    const handleCancel = (event) => {
        event.preventDefault();
        history.goBack()
    }

    //Valido que ningun campo es vacio
    const validForm = () =>{
        let validAllDetails = details.every(detail => validDetails(detail))
        return validAllDetails && date && selectedObra
    }

    const validDetails = (detail) => {
        return detail.producto && detail.cantidad && detail.precio
    }

    const searchClientes = (event) => {
        let _filteredClientes;
        if(!event.query.trim().length){
            _filteredClientes = [...allClientes];
        }else{
            _filteredClientes = allClientes.filter((cliente) => {
                return cliente.razonSocial.startsWith(event.query)
            })
        }
        setFilteredClientes(_filteredClientes);
    }

    const searchObras = (event) => {
        let _filteredObras;
        if(!event.query.trim().length){
            if(selectedCliente){
                _filteredObras = [...selectedCliente.obras];
            }else{
                showToast('Error','Seleccione un cliente primero','warn')
            }
        }else{//hago este try/catch porque si escribe cualquier cosa en el cliente y despues escribe en este se descajeta
            try {
                _filteredObras = [...selectedCliente.obras].filter((obra) => {
                    return obra.direccion.startsWith(event.query)
                })
            }catch(err){
                showToast('Error','Seleccione un cliente primero','warn')
            }
        }
        setFilteredObras(_filteredObras)
    }

    const onChangeCliente = (e) => {
        setSelectedCliente(e.value)
        setSelectedObra(null)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(date)
        if(details.length===0){
            showToast('Error','Debe tener al menos un detalle','warn')
        }else{
            if(validForm()){
                setLoadingSubmit(true);
                const detallesSinId = details.map(item => ({...item}))
                detallesSinId.map(item => item.id = null)
                const data = {
                    "fechaPedido": date,
                    "obra": selectedObra,
                    "detalle": detallesSinId
                }
                //console.log(data)
                axios.post(orderService+'/pedido', data)
                .then(function (response) {
                    //Ver que hago aca
                    console.log(response);
                    setLoadingSubmit(false);
                    showToast('Exito!','Pedido creado correctamente','success')
                    history.push("/pedido-listado")
                })
                .catch(function (error) {
                    console.log(error);
                    showToast('Error','No se pudo guardar el pedido, intentelo mas tarde','error')
                    setLoadingSubmit(false);
                })
            }else{
                showToast('Error','FALTAN LLENAR CAMPOS','warn')
            }
        }
    }

    const getDetail = (prop, id) => {
        const index = details.findIndex(details => details.id===id)
        return details[index][prop];
    }

    const DetailsList = details.map((detail, index) => (
        <DetailCard
            key={detail.id}
            id={detail.id}
            onDelete = {() => handleDeleteDetail(index)}
            updateDetail = {(event, prop) => updateDetail(event, prop, detail.id)}
            allProductos = {allProductos}
            producto={getDetail("producto", detail.id)}
            cantidad={getDetail("cantidad", detail.id)}
            precio={getDetail("precio", detail.id)}
        />
    ))

    return (
        loadingStart?
        <div style={{"display": "flex"}}>
            <Toast ref={toast} />
            <ProgressSpinner/>
        </div>
        :
        <div>
            <Toast ref={toast} />
            <p className="text-3xl font-bold text-800">Registrar pedido</p>
            <Card title="Obra destino">
                <span className="p-float-label">
                    <AutoComplete id="clienteAutocomplete" className='w-full' value={selectedCliente} suggestions={filteredClientes} completeMethod={searchClientes} field="razonSocial" dropdown forceSelection onChange={(e)=>onChangeCliente(e)} />
                    <label htmlFor="clienteAutocomplete">Razon social del cliente</label>
                </span>
                <br/>
                <span className="p-float-label">
                    <AutoComplete id="obraAutocomplete" className='w-full' value={selectedObra} suggestions={filteredObras} completeMethod={searchObras} field="direccion" dropdown forceSelection onChange={(e) => setSelectedObra(e.value)} />
                    <label htmlFor="obraAutocomplete">Direccion de la obra</label>
                </span>
            </Card>
            <Card title="Fecha de envio">
                <Calendar id='calendar' className='w-full' value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" mask="99/99/9999"/>
            </Card>
            <Card title="Detalle"
            footer={
                <div>
                    <Button className="btn btn-primary" onClick={(event)=>handleAddDetail(event)}>Agregar detalle</Button>
                    <Divider/>
                    <div className="flex justify-content-between">
                        <Button className="p-button-danger" onClick={(event)=> handleCancel(event)} label="Cancelar"></Button>
                        <Button type="submit" className="btn btn-primary" icon="pi pi-check" onClick={(event)=> handleSubmit(event)} label="Guardar" loading={loadingSubmit}></Button>
                    </div>
                </div>
            }>
                {DetailsList}
            </Card>
        </div>
    )
}

export default RegistrarPedido
