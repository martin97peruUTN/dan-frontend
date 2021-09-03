import React from 'react'
import CardSecondary from '../CardSecondary'
import { InputText } from 'primereact/inputtext';

const EfectivoCard = (props) => {
    return (
        <CardSecondary title={"Efectivo"}>
            <span className="p-float-label">
                <InputText id="observacion" className='w-full' onChange={(event) => props.updateMedioPago(event, "observacion")} />
                <label htmlFor="observacion">Observacion</label>
            </span>
            <br/>
            <span className="p-float-label">
                <InputText id="nroRecibo" className='w-full' keyfilter="num" onChange={(event) => props.updateMedioPago(event, "nroRecibo")} />
                <label htmlFor="nroRecibo">Numero de recibo</label>
            </span>
        </CardSecondary>
    )
}

export default EfectivoCard
