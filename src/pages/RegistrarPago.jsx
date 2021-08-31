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

const RegistrarPago = (props) => {

    const[loadingStart, setLoadingStart] = useState(true)
    const[loadingSubmit, setLoadingSubmit] = useState(false)
    const toast = useRef(null);
    const [allClientes, setAllClientes] = useState([])
    const [filteredClientes, setFilteredClientes] = useState([])
    const [selectedCliente, setSelectedCliente] = useState()
    const [medioPago, setMedioPago] = useState()
    const [pago, setPago] = useState({})
    const [medioPagoCard, setMedioPagoCard] = useState(<CardSecondary title="Seleccione un medio de pago"></CardSecondary>)

    const mediosDePago = [
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

    const handleSubmit = (event) => {
        event.preventDefault();

    }

    const onChangeMedioPago = (e) => {
        setMedioPago(e.value)
        switch (e.value) {
            case "efectivo":
                setMedioPagoCard(<EfectivoCard/>)
                break;
            case "transferencia":
                setMedioPagoCard(<TransferenciaCard/>)
                break;
            case "cheque":
                setMedioPagoCard(<ChequeCard/>)
                break;
            default:
                setMedioPagoCard(<h1>aca no deberia llegar</h1>)
                break;
        }
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
                    <Dropdown id="medioPagoDropdown" className='w-full' value={medioPago} options={mediosDePago} onChange={e=>onChangeMedioPago(e)} />
                    <label htmlFor="medioPagoDropdown">Medio de pago</label>
                </span>
                <br/>
                {medioPagoCard}
            </Card>
        </div>
    )
}

export default RegistrarPago
