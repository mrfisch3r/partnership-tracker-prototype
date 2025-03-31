import React, { useState } from 'react';

const AddPartnerForm = ({ onPartnerAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    organization_name: '',
    county: '',
    status: '',
    contact_date: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:5000/api/partner', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setMessage(data.message);
      if (onPartnerAdded) {
        onPartnerAdded(data.partner);
      }
    } catch (err) {
      console.error('Error adding partner:', err);
      setMessage('Error adding partner.');
    }
  };

  return (
    <div>
      <h2>Add Community Partner Data</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Partner Name" onChange={handleChange} required />
        <input type="text" name="organization_name" placeholder="Organization Name" onChange={handleChange} required />
        <input type="text" name="county" placeholder="County" onChange={handleChange} required />
        <input type="text" name="status" placeholder="Status" onChange={handleChange} required />
        <input type="date" name="contact_date" onChange={handleChange} required />
        <button type="submit">Add Partner</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPartnerForm;