import apiClient from "./apiClient";
import IItem from "../Interfaces/IItem";

const ItemService = (() => {
    const ItemEndpoint = "/Item";

    const getAllItems = async () => {
        try {
            const response = await apiClient.get(ItemEndpoint);
            return response.data;
        } catch (error) {
            console.error("Error inside getAllItems", error);
            throw error;
        }
    };

    const getById = async (id: number) => {
        try {
            const response = await apiClient.get(`${ItemEndpoint}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error with get by id", error);
            throw error;
        }
    };

    const getByName = async (name: string) => {
        try {
            const response = await apiClient.get(`${ItemEndpoint}/name/${name}`);
            return response.data;
        } catch (error) {
            console.error("Error with Get by name", error);
            throw error;
        }
    };

    const putItem = async (editedItem: IItem) => {
        try {
            const response = await apiClient.put(ItemEndpoint, editedItem);
            return response.data;
        } catch (error) {
            console.error("Error with Put Item", error);
            throw error;
        }
    };

    const postItem = async (newItem: IItem) => {
        try {
            const response = await apiClient.post(ItemEndpoint, newItem);
            return response.data;
        } catch (error) {
            console.error("Error with Post Item", error);
            throw error;
        }
    };

    const getImage = async (id: number) => {
        try {
            const response = await apiClient.get(`${ItemEndpoint}/image/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error with Get Image", error);
            throw error;
        }
    };

    return {
        getAllItems,
        getById,
        getByName,
        putItem,
        postItem,
        getImage,
    };
})();

export default ItemService;
