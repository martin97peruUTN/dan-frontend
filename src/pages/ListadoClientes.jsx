import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ClientListCard from '../components/cards/ClientListCard'
import {userService} from '../Url'
import { ProgressSpinner } from 'primereact/progressspinner';

const ListadoClientes = () => {

    const[loading, setLoading] = useState(true)
    const [clientes, setClientes] = useState([])

    useEffect(() => {
        axios.get(userService+'/cliente').then((res) => {
            setClientes(res.data);
        });
        setLoading(false)
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
            <ProgressSpinner/>
        </div>
        :
        <div>
            {cardsMarkup}
        </div>
    )
}

export default ListadoClientes
