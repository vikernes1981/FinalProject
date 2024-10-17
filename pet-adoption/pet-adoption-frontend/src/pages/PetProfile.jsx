import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

// PetProfile Component
const PetProfile = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      const response = await axios.get(`/api/pets/${id}`);
      setPet(response.data);
    };
    fetchPet();
  }, [id]);

  if (!pet) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{pet.name}</h1>
      <img src={pet.image} alt={pet.name} className="w-full h-64 object-cover rounded mt-4" />
      <p className="mt-4"><strong>Breed:</strong> {pet.breed}</p>
      <p><strong>Age:</strong> {pet.age} years</p>
      <p><strong>Location:</strong> {pet.location}</p>
      <p className="mt-4">{pet.description}</p>
      
      <h2 className="text-2xl font-bold mt-6">Adopt {pet.name}</h2>
      <ContactForm petId={pet._id} />
    </div>
  );
};

// ContactForm Component
const ContactForm = ({ petId }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/pets/${petId}/inquiry`, formData);
      alert('Inquiry submitted successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to submit inquiry');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Your Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <textarea
        placeholder="Message"
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
      />
      <button type="submit" className="btn btn-primary mt-4">Send Inquiry</button>
    </form>
  );
};

export default PetProfile;
