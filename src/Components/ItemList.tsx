import React from "react";
import { useItems } from "../Context/ItemContext";
import Item from "./Item";

const ItemList = () => {
    const { items } = useItems(); // Get items from context

    const getItem = () => {
        return items?.map((item, i) => (
            <Item 
                key={`item-${i}`} 
                name={item.name} 
                price={item.price} 
                description={item.description} 
                image={"http://localhost:5282/api/Item/getImage/" + item.id} 
            />       
        ));
    };

    return (
        <section>
            {getItem()}
        </section>
    );
};

export default ItemList;