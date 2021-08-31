import React, {useState, useEffect} from 'react'
import CardSecondary from '../CardSecondary'
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';

const ChequeCard = (props) => {

    return (
        <CardSecondary title={"Cheque"}>
            <span className="p-float-label">
                <InputText id="observacion" className='w-full' keyfilter="num" onChange={(event) => props.updateMedioPago(event, "observacion")} />
                <label htmlFor="observacion">Observacion (monto)</label>
            </span>
            <br/>
            <span className="p-float-label">
                <InputText id="nroCheque" className='w-full' keyfilter="num" onChange={(event) => props.updateMedioPago(event, "nroCheque")} />
                <label htmlFor="nroCheque">Numero de cheque</label>
            </span>
            <br/>
            <span className="p-float-label">
                <Calendar id="calendar" className='w-full' value={props.calendarValue} onChange={(e) => props.updateMedioPago(e, "fechaCobro")} dateFormat="dd/mm/yy" mask="99/99/9999"/>
                <label htmlFor="calendar">Fecha de cobro</label>
            </span>
            <br/>
            <span className="p-float-label">
                <InputText id="banco" className='w-full' onChange={(event) => props.updateMedioPago(event, "banco")} />
                <label htmlFor="banco">Banco</label>
            </span>
        </CardSecondary>
    )
}

export default ChequeCard
