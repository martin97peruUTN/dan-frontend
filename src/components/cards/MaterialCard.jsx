import React from 'react'
import CardSecondary from './CardSecondary'

const MaterialCard = (props) => {

    return (
        <CardSecondary>
            <label class="form-label">Nombre</label>
            <input
                type="text"
                class="form-control"
                placeholder="Nombre"
                onChange={(event) => props.updateMaterial(event, "nombre")}
            />
            <label class="form-label">Descripcion</label>
            <input
                type="text"
                class="form-control"
                placeholder="Descripcion"
                onChange={(event) => props.updateMaterial(event, "descripcion")}
            />
            <label class="form-label">Precio</label>
            <input
                type="text"
                class="form-control"
                placeholder="Precio"
                onChange={(event) => props.updateMaterial(event, "precio")}
            />
            <label class="form-label">Stock actual</label>
            <input
                type="text"
                class="form-control"
                placeholder="Stock actual"
                onChange={(event) => props.updateMaterial(event, "stockActual")}
            />
            <label class="form-label">Stock minimo</label>
            <input
                type="text"
                class="form-control"
                placeholder="Stock minimo"
                onChange={(event) => props.updateMaterial(event, "stockMinimo")}
            />
            <label class="form-label">Unidad</label>
            <input
                type="text"
                class="form-control"
                placeholder="Unidad"
                onChange={(event) => props.updateMaterial(event, "unidad")}
            />
            <br/>
            {props.onDelete? <button class="btn btn-danger" onClick={props.onDelete}>Borrar obra</button> : null}
        </CardSecondary>
    )
}

export default MaterialCard
