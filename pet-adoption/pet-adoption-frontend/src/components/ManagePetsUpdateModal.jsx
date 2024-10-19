import React, { useState, useEffect } from 'react';
import { addPet, updatePet, deletePet } from '../services/PostServicesPets';

const ManagePetsModal = ({ pet, onClose, onSave }) => {
    const [currentPet, setCurrentPet] = useState(pet || {});

    useEffect(() => {
        setCurrentPet(pet);
    }, [pet]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentPet({ ...currentPet, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pet) {
            await updatePet(currentPet._id, currentPet);
        } else {
            await addPet(currentPet);
        }
        onSave(currentPet); // Notify parent to update pets list
        onClose(); // Close the modal
        window.location.reload(); // Refresh the page
    };

    const handleDelete = async () => {
        if (currentPet._id) {
            await deletePet(currentPet._id);
            onSave(null); // Notify parent to update pets list
            onClose(); // Close the modal
            window.location.reload(); // Refresh the page
        }
    };

    return (
        <>
            <div className="modal modal-open">
                <div className="modal-box">
                    <div className="modal-header">
                        <h3 className="font-bold text-lg">{currentPet._id ? 'Update Pet Information' : 'Add New Pet'}</h3>
                        <button className="btn btn-sm btn-circle btn-ghost" onClick={() => { onClose(); window.location.reload(); }}>✕</button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-control">
                                <label className="label" htmlFor="formPetName">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    id="formPetName"
                                    name="name"
                                    className="input input-bordered"
                                    value={currentPet.name || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="formPetAge">
                                    <span className="label-text">Age</span>
                                </label>
                                <input
                                    type="number"
                                    id="formPetAge"
                                    name="age"
                                    className="input input-bordered"
                                    value={currentPet.age || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="formPetBreed">
                                    <span className="label-text">Breed</span>
                                </label>
                                <input
                                    type="text"
                                    id="formPetBreed"
                                    name="breed"
                                    className="input input-bordered"
                                    value={currentPet.breed || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="formPetType">
                                    <span className="label-text">Type</span>
                                </label>
                                <input
                                    type="text"
                                    id="formPetType"
                                    name="type"
                                    className="input input-bordered"
                                    value={currentPet.type || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="formPetDescription">
                                    <span className="label-text">Description</span>
                                </label>
                                <textarea
                                    id="formPetDescription"
                                    name="description"
                                    className="textarea textarea-bordered"
                                    value={currentPet.description || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor="formPetImage">
                                    <span className="label-text">Image URL</span>
                                </label>
                                <input
                                    type="text"
                                    id="formPetImage"
                                    name="image"
                                    className="input input-bordered"
                                    value={currentPet.image || ''}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary mr-2" type="button" onClick={() => { onClose(); window.location.reload(); }}>
                                    Close
                                </button>
                                {currentPet._id && (
                                    <button className="btn btn-error mr-2" type="button" onClick={async () => {
                                        await handleDelete();
                                        onClose();
                                        window.location.reload();
                                    }}>
                                        Delete
                                    </button>
                                )}
                                <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
                                    {currentPet._id ? 'Save Changes' : 'Add Pet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManagePetsModal;
