import React, { createContext, useState, useEffect, useContext } from "react";
import IItems from "../Interfaces/IItem";
import ItemService from "../Services/ItemService";

// Define the context type
interface ItemContextType {
    items: IItems[];
    fetchItems: () => Promise<void>;
}

// Create the context with a default value
const ItemContext = createContext<ItemContextType | undefined>(undefined);

// Create a provider component
export const ItemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<IItems[]>([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const data = await ItemService.getAllItems();
            setItems(data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    return (
        <ItemContext.Provider value={{ items, fetchItems }}>
            {children}
        </ItemContext.Provider>
    );
};

// Custom hook for consuming the context
export const useItems = () => {
    const context = useContext(ItemContext);
    if (context === undefined) {
        throw new Error("useItems must be used within an ItemProvider");
    }
    return context;
};