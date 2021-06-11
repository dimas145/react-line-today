import React from 'react'
import { useParams } from 'react-router-dom';

function FeedsComponent(props) {
    let { name } = useParams();
    console.log(name);
    console.log(props.feeds);

    return (
        <div className="feeds_component">
            <h1>{name}</h1>
        </div>
    )
}

export default FeedsComponent;