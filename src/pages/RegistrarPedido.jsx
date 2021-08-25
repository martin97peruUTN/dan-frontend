import React, {useState, useEffect, useRef} from 'react'
import Card from '../components/cards/Card';
import CardSecondary from '../components/cards/CardSecondary';
import { AutoComplete } from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import axios from 'axios'
import {userService} from '../Url'
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';

const RegistrarPedido = ({history}) => {

    const[loading, setLoading] = useState(true)
    const toast = useRef(null);
    const [date, setDate] = useState()
    const [obras, setObras] = useState()
    const [selectedObra, setSelectedObra] = useState()

    const showToast = (summary, message, severity) => {
        toast.current.show({severity:severity, summary: summary, detail:message, life: 3000});
    }

    useEffect(() => {
        axios.get(userService+'/obra').then((res) => {
            setObras(res.data);
            setLoading(false)
        })
        /*.catch(function (error) {
            showToast('Error','No se pudieron cargar las obras, intentelo mas tarde','error')
            setTimeout(() => {
                history.push("/")
            }, 3000);
        })*/
        setLoading(false)//sacar este
    }, [])

    return (
        loading?
        <div style={{"display": "flex"}}>
            <Toast ref={toast} />
            <ProgressSpinner/>
        </div>
        :
        <div>
            <p className="text-3xl font-bold text-800">Registrar pedido</p>
            <Card title="Obra">
                
            </Card>
            <Card title="Fecha de envio">
                <Calendar value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" mask="99/99/9999"/>
            </Card>
            <Card title="Detalle">
                
            </Card>
        </div>
    )
}

export default RegistrarPedido
