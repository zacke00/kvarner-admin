import { FC } from 'react';
import IItem from '../Interfaces/IItem';

const Item: FC<IItem> = ({name, price, description, image}) => {
    return (
        <section>
            <div>
                <h1>{name}</h1>
                <h2>{price}</h2>
                <p>{description}</p>
                <img src={image} alt={name}/>
            </div>
        </section>
    )
}

export default Item;