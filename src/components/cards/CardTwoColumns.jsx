import React from 'react'
import '../../Components.css'
import Card from './Card'

const CardTwoColumns = (props) => {
    return (
        <Card>
            <div className="row">
                <div className="col-md-10">
                    {props.leftSide}
                </div>
                <div className="col-md-2">
                    {props.rightSide}
                </div>
            </div>
        </Card>
    )
}

export default CardTwoColumns
