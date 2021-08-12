import React, {useState, useEffect} from 'react';
import Card from '../components/cards/Card';
import ConstructionCard from '../components/cards/ConstructionCard';

const RegistrarCliente = () => {

    const [newClient, setNewClient] = useState({
        constructions: [{id: 1}]
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(newClient);
    }

    const handleAddConstruction = (event) => {
        event.preventDefault();

    }

    const handleDeleteConstruction = (event) => {
        event.preventDefault();

    }

    const ConstructionsList = newClient.constructions.map((cont, index) => (
        <ConstructionCard
            key={cont.id}
        />
    ))

    return (
        <form onSubmit={handleSubmit}>
            <Card>
                <h3>Datos del usuario</h3>
                <label class="form-label">Usuario</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Usuario"
                    onChange={(event) => setNewClient({...newClient, user: event.target.value})}
                />
                <label class="form-label">Contraseña</label>
                <input
                    type="password"
                    class="form-control"
                    placeholder="Contraseña"
                    onChange={(event) => setNewClient({...newClient, password: event.target.value})}
                />
                <label class="form-label">Razon social</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Razon social"
                    onChange={(event) => setNewClient({...newClient, businessName: event.target.value})}
                />
                <label class="form-label">CUIT</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="CUIT"
                    onChange={(event) => setNewClient({...newClient, cuit: event.target.value})}
                />
                <label class="form-label">Mail</label>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Mail"
                    onChange={(event) => setNewClient({...newClient, mail: event.target.value})}
                />
            </Card>
            <Card>
                <h3>Obras</h3>
                {ConstructionsList}
                <button class="btn btn-primary" onClick={(event)=>handleAddConstruction(event)}>Agregar obra</button>
            </Card>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    )
}

export default RegistrarCliente
