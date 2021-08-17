import React from 'react'
import CardSecondary from './CardSecondary'

const MaterialCard = (props) => {

    return (
        <CardSecondary>
            <label className="form-label">Nombre</label>
            <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                onChange={(event) => props.updateMaterial(event, "nombre")}
            />
            <label className="form-label">Descripcion</label>
            <input
                type="text"
                className="form-control"
                placeholder="Descripcion"
                onChange={(event) => props.updateMaterial(event, "descripcion")}
            />
            <label className="form-label">Precio</label>
            <input
                type="text"
                className="form-control"
                placeholder="Precio"
                onChange={(event) => props.updateMaterial(event, "precio")}
            />
            <label className="form-label">Stock actual</label>
            <input
                type="text"
                className="form-control"
                placeholder="Stock actual"
                onChange={(event) => props.updateMaterial(event, "stockActual")}
            />
            <label className="form-label">Stock minimo</label>
            <input
                type="text"
                className="form-control"
                placeholder="Stock minimo"
                onChange={(event) => props.updateMaterial(event, "stockMinimo")}
            />
            <label className="form-label">Unidad</label>
            <input
                type="text"
                className="form-control"
                placeholder="Unidad"
                onChange={(event) => props.updateMaterial(event, "unidad")}
            />
            <br/>
            {props.onDelete? <button className="btn btn-danger" onClick={props.onDelete}>Borrar obra</button> : null}
        </CardSecondary>
    )
}

export default MaterialCard
