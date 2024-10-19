// src/services/postService.jsx

import axios from 'axios';

const API_URL_PETS = 'http://localhost:5000/api/pets'; // Update to the correct API endpoint

export const getPosts = async () => {
    const response = await axios.get(API_URL_PETS);
    return response.data;
};

export const getPostById = async (id) => {
    const response = await axios.get(`${API_URL_PETS}/${id}`);
    return response.data;
};

export const createPost = async (post) => {
    const response = await axios.post(API_URL_PETS, post, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const deletePost = async (id) => {
    const response = await axios.delete(`${API_URL_PETS}/${id}`);
    return response.data; // Optionally return the deleted post or a success message
};

export const updatePost = async (id, updatedFields) => {
    const response = await axios.put(`${API_URL_PETS}/${id}`, updatedFields, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};
