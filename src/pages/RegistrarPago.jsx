import React, {useState, useRef, useEffect} from 'react'
import Card from '../components/cards/Card';
import { Button } from 'primereact/button'
import axios from 'axios'
import {userService, orderService, productService} from '../Url'
import { ProgressSpinner } from 'primereact/progressspinner';
import { AutoComplete } from 'primereact/autocomplete';
import { Toast } from 'primereact/toast';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import CardSecondary from '../components/cards/CardSecondary';
import EfectivoCard from '../components/cards/mediosDePago/EfectivoCard'
import ChequeCard from '../components/cards/mediosDePago/ChequeCard'
import TransferenciaCard from '../components/cards/mediosDePago/TransferenciaCard'
import {currentAccountService} from '../Url'

const RegistrarPago = (props) => {

    const[loadingStart, setLoadingStart] = useState(true)
    const[loadingSubmit, setLoadingSubmit] = useState(false)
    const toast = useRef(null);
    const [allClientes, setAllClientes] = useState([])
    const [filteredClientes, setFilteredClientes] = useState([])
    const [selectedCliente, setSelectedCliente] = useState()
    const [medioDePago, setMedioDePago] = useState({})
    const [medioPagoCard, setMedioPagoCard] = useState()

    const allMediosDePago = [
        {label: 'Efectivo', value: 'efectivo'},
        {label: 'Transferencia', value: 'transferencia'},
        {label: 'Cheque', value: 'cheque'}
    ];

    const showToast = (summary, message, severity) => {
        toast.current.show({severity:severity, summary: summary, detail:message, life: 3000});
    }

    useEffect(() => {
        setLoadingStart(true)
        axios.get(userService+'/cliente').then((res) => {
            setAllClientes(res.data);
            setLoadingStart(false)
        })
        .catch(function (error) {
            showToast('Error','No se pudieron cargar los clientes, intentelo mas tarde','error')
            setTimeout(() => {
                props.history.push("/")
            }, 3000);
        })
    }, [])

    useEffect(() => {
        switch (medioDePago.type) {
            case "efectivo":
                setMedioPagoCard(<EfectivoCard updateMedioPago={(event, prop)=>updateMedioPago(event, prop)}/>)
                break;
            case "transferencia":
                setMedioPagoCard(<TransferenciaCard updateMedioPago={(event, prop)=>updateMedioPago(event, prop)}/>)
                break;
            case "cheque":
                setMedioPagoCard(<ChequeCard updateMedioPago={(event, prop)=>updateMedioPago(event, prop)}/>)
                break;
            default:
                setMedioPagoCard(<CardSecondary title="Seleccione un medio de pago"></CardSecondary>)
                break;
        }
    }, [medioDePago])//tengo que ponerlo asi y no medioDePago.type porque los campos internos andan mal sino

    const updateMedioPago = (event, prop) => {
        const medioPagoCopy = {...medioDePago}
        medioPagoCopy[prop] = event.target.value;
        setMedioDePago(medioPagoCopy)
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

    const handleCancel = (event) => {
        event.preventDefault();
        props.history.push("/")
    }

    const validPago = () => {
        let boolean = medioDePago.cliente && medioDePago.type
        switch (medioDePago.type) {
            case "efectivo":
                
                break;
            case "transferencia":
                
                break;
            case "cheque":
                
                break;
            default:
                showToast('Error','Seleccione un medio de pago','warn')
                boolean = false
                break;
        }
        return boolean
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            "cliente":selectedCliente,
            "medio":medioDePago
        }
        console.log(data)
        if(validPago()){
            /*setLoadingSubmit(true);
            axios.post(currentAccountService+'/pago', data)
            .then(function (response) {
                //Ver que hago aca
                console.log(response);
                setLoadingSubmit(false);
                showToast('Exito!','Pago creado correctamente','success')
                props.history.push("/")
            })
            .catch(function (error) {
                console.log(error);
                showToast('Error','No se pudo guardar el pago, intentelo mas tarde','error')
                setLoadingSubmit(false);
            })*/
        }else{
            showToast('Error','FALTAN LLENAR CAMPOS','warn')
        }
    }

    const updateMedioPagoType = (e) => {
        setMedioDePago({})
        setMedioDePago({...medioDePago, "type": e.value})
    }

    return (
        loadingStart?
        <div style={{"display": "flex"}}>
            <Toast ref={toast} />
            <ProgressSpinner/>
        </div>
        :
        <div>
            <Toast ref={toast} />
            <p className="text-3xl font-bold text-800">Registrar pago</p>
            <Card title="Datos del pago"
            footer={
                <div>
                    <Divider/>
                    <div className="flex justify-content-between">
                        <Button className="p-button-danger" onClick={(event)=> handleCancel(event)} label="Cancelar"></Button>
                        <Button type="submit" className="btn btn-primary" icon="pi pi-check" onClick={(event)=> handleSubmit(event)} label="Guardar" loading={loadingSubmit}></Button>
                    </div>
                </div>
            }>
                <span className="p-float-label">
                    <AutoComplete id="clienteAutocomplete" className='w-full' value={selectedCliente} suggestions={filteredClientes} completeMethod={searchClientes} field="razonSocial" dropdown forceSelection onChange={(e)=>setSelectedCliente(e.value)} />
                    <label htmlFor="clienteAutocomplete">Cliente</label>
                </span>
                <br/>
                <span className="p-float-label">
                    <Dropdown id="medioPagoDropdown" className='w-full' value={medioDePago.type} options={allMediosDePago} onChange={e=>setMedioDePago({"type": e.value})} />
                    <label htmlFor="medioPagoDropdown">Medio de pago</label>
                </span>
                <br/>
                {medioPagoCard}
            </Card>
        </div>
    )
}

export default RegistrarPago
