import React from 'react'
import CardSecondary from './CardSecondary'

const ConstructionCard = (props) => {

    return (
        <CardSecondary>
            <label class="form-label">Descripcion</label>
            <input
                type="text"
                class="form-control"
                placeholder="Descripcion"
                onChange={(event) => props.updateObra(event, "descripcion")}
            />
            <label class="form-label">Latitud</label>
            <input
                type="text"
                class="form-control"
                placeholder="Latitud"
                onChange={(event) => props.updateObra(event, "latitud")}
            />
            <label class="form-label">Longitud</label>
            <input
                type="text"
                class="form-control"
                placeholder="Longitud"
                onChange={(event) => props.updateObra(event, "longitud")}
            />
            <label class="form-label">Direccion</label>
            <input
                type="text"
                class="form-control"
                placeholder="Direccion"
                onChange={(event) => props.updateObra(event, "direccion")}
            />
            <label class="form-label">Superficie</label>
            <input
                type="text"
                class="form-control"
                placeholder="Superficie"
                onChange={(event) => props.updateObra(event, "superficie")}
            />
            <label class="form-label">Tipo de obra</label>
            <input
                type="text"
                class="form-control"
                placeholder="Tipo de obra"
                onChange={(event) => props.updateObra(event, "tipo")}
            />
            <br/>
            {props.onDelete? <button class="btn btn-danger" onClick={props.onDelete}>Borrar obra</button> : null}
        </CardSecondary>
    )
}

export default ConstructionCard
