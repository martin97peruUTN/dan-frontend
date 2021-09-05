import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import ClientListCard from '../components/cards/ClientListCard'
import {userService} from '../Url'
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';

const ListadoClientes = ({history}) => {

    const[loading, setLoading] = useState(true)
    const [clientes, setClientes] = useState([])
    const toast = useRef(null);
    //const [cookies, setCookies] = useCookies(['acces_token'])
    const cookies = new Cookies();
    const showToast = (summary, message, severity) => {
        toast.current.show({severity:severity, summary: summary, detail:message, life: 3000});
    }

    useEffect(() => {
        let accessToken = cookies.get('access_token')
        console.log(accessToken)
        axios.get(userService+'/cliente', { headers: { Authorization: 'Bearer ' + accessToken } }).then((res) => {
            setClientes(res.data);
            setLoading(false)
        })
        .catch((err) => {
            showToast('Error','No se pudieron cargar los clientes, intentelo mas tarde','error')
            setTimeout(() => {
                history.push("/")
            }, 3000);
        })
    }, [])

    const cardsMarkup = clientes.map((cliente,index) => (
        <ClientListCard
            key={cliente.id}
            razonSocial={cliente.razonSocial}
            cuit={cliente.cuit}
            mail={cliente.mail}
        />
    ))

    return (
        loading?
        <div style={{"display": "flex"}}>
            <Toast ref={toast} />
            <ProgressSpinner/>
        </div>
        :
        <div>
            {cardsMarkup}
        </div>
    )
}

export default ListadoClientes
