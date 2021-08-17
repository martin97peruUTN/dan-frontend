import React from 'react'
import CardSecondary from './CardSecondary'
import { Button } from 'primereact/button'

const ConstructionCard = (props) => {

    return (
        <CardSecondary>
            <label className="form-label">Descripcion</label>
            <input
                type="text"
                className="form-control"
                placeholder="Descripcion"
                onChange={(event) => props.updateObra(event, "descripcion")}
            />
            <label className="form-label">Latitud</label>
            <input
                type="text"
                className="form-control"
                placeholder="Latitud"
                onChange={(event) => props.updateObra(event, "latitud")}
            />
            <label className="form-label">Longitud</label>
            <input
                type="text"
                className="form-control"
                placeholder="Longitud"
                onChange={(event) => props.updateObra(event, "longitud")}
            />
            <label className="form-label">Direccion</label>
            <input
                type="text"
                className="form-control"
                placeholder="Direccion"
                onChange={(event) => props.updateObra(event, "direccion")}
            />
            <label className="form-label">Superficie</label>
            <input
                type="text"
                className="form-control"
                placeholder="Superficie"
                onChange={(event) => props.updateObra(event, "superficie")}
            />
            <label className="form-label">Tipo de obra</label>
            <input
                type="text"
                className="form-control"
                placeholder="Tipo de obra"
                onChange={(event) => props.updateObra(event, "tipo")}
            />
            <br/>
            {props.onDelete? <Button className="p-button-danger" onClick={props.onDelete}>Borrar obra</Button> : null}
        </CardSecondary>
    )
}

export default ConstructionCard
