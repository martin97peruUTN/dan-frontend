import React, {useState} from 'react'
import CardSecondary from './CardSecondary'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext';
import { AutoComplete } from 'primereact/autocomplete';


const DetailCard = (props) => {

    const [productoValue, setProductoValue] = useState()
    const [filteredProductos, setFilteredProductos] = useState()

    const updateProducto = (event) => {
        setProductoValue(event.value)
        props.updateDetail(event, "producto")
    }

    const searchProductos = (event) => {
        let _filteredProductos
        if(!event.query.trim().length){
            _filteredProductos = [...props.allProductos]
        }else{
            _filteredProductos = props.allProductos.filter((producto) => {
                return producto.nombre.startsWith(event.query)
            })
        }
        setFilteredProductos(_filteredProductos)
    }

    return (
        <CardSecondary
            footer={<Button className="p-button-danger" onClick={props.onDelete}>Borrar detalle</Button>}
        >
            <span className="p-float-label">
                <AutoComplete id="productoAutocomplete" className='w-full' value={productoValue} suggestions={filteredProductos} completeMethod={searchProductos} field="nombre" dropdown forceSelection onChange={(e)=>updateProducto(e)} />
                <label htmlFor="productoAutocomplete">Producto</label>
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
