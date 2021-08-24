import React from 'react'
import Card from './Card'

const ClientListCard = (props) => {
    return (
        <Card
        title={props.razonSocial}
        footer={
            null
        }
        >
            <div>CUIT: {props.cuit}</div>
            <div>Mail: {props.mail}</div>
        </Card>
    )
}

export default ClientListCard
