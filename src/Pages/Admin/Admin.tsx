import React, { useState, ChangeEvent } from "react";
import { useItems } from "../../Context/ItemContext";
import IItem from "../../Interfaces/IItem";
import ItemService from "../../Services/ItemService";
import ImageUploadService from "../../Services/ImageUploadService";

const Admin = () => {
    const { fetchItems } = useItems();
    const [name, setName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const logOut = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    const saveItem = async () => {
        if (!name || !image) {
            alert("Name and image are required!");
            return;
        }

        const newItem: IItem = {
            name,
            price,
            description,
            image: `${name}.jpg`, // Assume the image name will match the item's name
        };

        try {
            // Save the item data
            await ItemService.postItem(newItem);

            // Upload the image if it's selected
            if (image) {
                await ImageUploadService.uploadImage(name, image);
            }

            // Fetch and refresh items after adding a new one
            await fetchItems();

            // Reset the form after a successful submission
            setName("");
            setPrice(0);
            setDescription("");
            setImage(null);
        } catch (error) {
            console.error("Error saving item:", error);
        }
    };

    return (
        <section>
            <h1>Add Item</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
            <button onClick={saveItem}>Save Item</button>
            <button onClick={logOut}>log out</button>
        </section>
    );
};

export default Admin;