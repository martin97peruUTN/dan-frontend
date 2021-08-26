import React from 'react'
import CardSecondary from './CardSecondary'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext';


const DetailCard = (props) => {
    return (
        <CardSecondary
            footer={<Button className="p-button-danger" onClick={props.onDelete}>Borrar detalle</Button>}
        >
            <span className="p-float-label">
                <InputText id="producto" className='w-full' onChange={(event) => props.updateDetail(event, "producto")} />
                <label htmlFor="producto">Producto</label>
            </span>
            <br/>
            <span className="p-float-label">
                <InputText id="cantidad" className='w-full' keyfilter="num" onChange={(event) => props.updateDetail(event, "cantidad")} />
                <label htmlFor="cantidad">Cantidad</label>
            </span>
            <br/>
            <span className="p-float-label">
                <InputText id="precio" className='w-full' keyfilter="num" onChange={(event) => props.updateDetail(event, "precio")} />
                <label htmlFor="precio">Precio</label>
            </span>
        </CardSecondary>
    )
}

export default DetailCard
