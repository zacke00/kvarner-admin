import apiClient from "./apiClient";

const ImageUploadService = (() => {
    const imageUploadEndpoint = "/Item/UploadImage";

    const uploadImage = async (name: string, image: File) => {
        const formData = new FormData();
        formData.append("file", image);

        try {
            const response = await apiClient.post(`${imageUploadEndpoint}/${name}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Upload successful", response);
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }

        formData.delete("file");
    };

    return {
        uploadImage,
    };
})();

export default ImageUploadService;
