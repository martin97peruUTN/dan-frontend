import React from 'react'

const Card = (props) => {
    //secondary en un bool que indica si la card es secundaria o no
    const secondary = props.secondary;
    //obtengo el gris del archivo css
    const grey = getComputedStyle(document.documentElement).getPropertyValue('--grey');
    return (
        <div class="card mb-3" style={{backgroundColor: secondary ? grey : 'white'}}>
            <div class="card-body">
                {props.children}
            </div>
        </div>
    )
}

export default Card
