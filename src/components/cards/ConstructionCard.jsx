import React, {useState, useEffect}from 'react'
import CardSecondary from './CardSecondary'

const ConstructionCard = (props) => {

    const [construction, setConstruction] = useState({})

    const handleClick = (event) => {
        event.preventDefault();
        props.setNewClient({
            ...props.newClient,
            obras: [...props.newClient.obras, construction]
        })
    }

    const handleOnChange = (event) => {

    }

    return (
        <CardSecondary>
            <label class="form-label">Descripcion</label>
            <input
                type="text"
                class="form-control"
                placeholder="Descripcion"
                onChange={(event) => setConstruction({...construction, "descripcion":event.target.value})}
            />
            <label class="form-label">Latitud</label>
            <input
                type="text"
                class="form-control"
                placeholder="Latitud"
                onChange={(event) => setConstruction({...construction, "latitud":event.target.value})}
            />
            <label class="form-label">Longitud</label>
            <input
                type="text"
                class="form-control"
                placeholder="Longitud"
                onChange={(event) => setConstruction({...construction, "longitud":event.target.value})}
            />
            <label class="form-label">Direccion</label>
            <input
                type="text"
                class="form-control"
                placeholder="Direccion"
                onChange={(event) => setConstruction({...construction, "direccion":event.target.value})}
            />
            <label class="form-label">Superficie</label>
            <input
                type="text"
                class="form-control"
                placeholder="Superficie"
                onChange={(event) => setConstruction({...construction, "superficie":event.target.value})}
            />
            <label class="form-label">Tipo de obra</label>
            <input
                type="text"
                class="form-control"
                placeholder="Tipo de obra"
                onChange={(event) => setConstruction({...construction, "tipo":event.target.value})}
            />
            <button class="btn btn-primary" onClick={(event) => handleClick(event)}>Add</button>
            <button class="btn btn-danger" onClick={props.onDelete}>Delete</button>
        </CardSecondary>
    )
}

export default ConstructionCard
