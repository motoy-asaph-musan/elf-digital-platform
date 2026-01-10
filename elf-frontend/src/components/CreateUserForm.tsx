import React, { useState } from 'react';
import { createUser } from '../services/usersService';

const CreateUserForm = ({ onUserCreated }) => {
  const [formData, setFormData] = useState({ name: '', email: '', role: 'STUDENT' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(formData);
    setFormData({ name: '', email: '', role: 'STUDENT' });
    onUserCreated(); // Notify parent to refresh list
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <h3>Register New User</h3>
      <input 
        placeholder="Full Name" 
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})} 
        required 
      />
      <input 
        type="email" 
        placeholder="Email Address" 
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})} 
        required 
      />
      <select onChange={(e) => setFormData({...formData, role: e.target.value})}>
        <option value="STUDENT">Student</option>
        <option value="SCHOOL">School</option>
        <option value="TEACHER">Teacher</option>
      </select>
      <button type="submit">Add User</button>
    </form>
  );
};

export default CreateUserForm;