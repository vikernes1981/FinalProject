import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
    getAllPets,
    addPet,
    updatePet,
} from "../services/PostServicesPets";
import ManagePetsModal from "./ManagePetsUpdateModal"; // Ensure the import matches the file name

const ManagePets = () => {
    const [pets, setPets] = useState([]);
    const [newPet, setNewPet] = useState({
        name: "",
        age: "",
        breed: "",
        type: "",
        description: "",
        image: "",
    });
    const [editingPet, setEditingPet] = useState(null); // State for the pet currently being edited

    useEffect(() => {
        fetchPets();
    }, []);

    const fetchPets = async () => {
        const res = await getAllPets();
        if (Array.isArray(res)) {
            setPets(res);
        } else {
            setPets([]);
            console.error("Expected an array but got:", res);
        }
    };

    const handleAddPet = async () => {
        try {
            await addPet(newPet);
            setNewPet({
                name: "",
                age: "",
                breed: "",
                type: "",
                description: "",
                image: "",
            }); // Reset the form
            fetchPets();
        } catch (error) {
            console.error("Error adding pet:", error);
        }
    };

    const petOptions = pets.map((pet) => ({
        value: pet._id,
        label: `${pet.name} (${pet.breed})`,
        pet: pet,
    }));

    return (
        <div className="manage-pets p-4">
            <h2 className="text-2xl font-semibold mb-6">Manage Pets</h2>
            <Select
                options={petOptions}
                onChange={(selectedOption) => setEditingPet(selectedOption.pet)}
                placeholder="Select a pet..."
                className="mb-6"
            />

            {editingPet && (
                <ManagePetsModal
                    pet={editingPet}
                    onClose={() => setEditingPet(null)}
                    onUpdate={(updatedPet) => {
                        fetchPets(); // Refresh the pet list after update or delete
                        setEditingPet(null); // Clear editingPet
                    }}
                    onDelete={() => {
                        fetchPets(); // Refresh the pet list after delete
                        setEditingPet(null); // Clear editingPet
                    }}
                />
            )}

            <div className="add-pet-form p-4 bg-white shadow-md rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Add New Pet</h3>
                <div className="grid grid-cols-1 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={newPet.name}
                        onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        placeholder="Age"
                        value={newPet.age}
                        onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        placeholder="Breed"
                        value={newPet.breed}
                        onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        placeholder="Type"
                        value={newPet.type}
                        onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newPet.description}
                        onChange={(e) => setNewPet({ ...newPet, description: e.target.value })}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newPet.image}
                        onChange={(e) => setNewPet({ ...newPet, image: e.target.value })}
                        className="input input-bordered w-full"
                    />
                    <button onClick={handleAddPet} className="btn btn-primary w-full">
                        Add Pet
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManagePets;
