// src/services/postService.jsx

const API_URL_PETS = 'http://localhost:5000/api/pets'; // Update to the correct API endpoint

export const getPosts = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const getPostById = async (id) => {
    const response = await fetch(`${API_URL_PETS}/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const createPost = async (post) => {
    const response = await fetch(API_URL_PETS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};

export const deletePost = async (id) => {
    const response = await fetch(`${API_URL_PETS}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json(); // Optionally return the deleted post or a success message
};

export const updatePost = async (id, updatedFields) => {
    const response = await fetch(`${API_URL_PETS}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
};