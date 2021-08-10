import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {urlBase} from '../../Url'
import Card from '../cards/Card'

const ListadoClientes = () => {

    const [clientes, setClientes] = useState([])

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
            setClientes(res.data);
        });
    }, [])

    const cardsMarkup = clientes.map((cliente,index) => (
        <Card
            key={cliente.id}
            phone={cliente.phone}
            name={cliente.name}
            //avatar={cliente.avatar}
            //onDelete={() => deleteclienteHandler(index)}
            //onChangeName={(event) => changeNameHandler(event, cliente.id)}
        />
    ))

    return (
        <div>
            {cardsMarkup}
        </div>
    )
}

export default ListadoClientes
