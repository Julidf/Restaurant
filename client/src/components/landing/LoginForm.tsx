import axios from 'axios';
import React, { useState } from 'react';
import  './LoginForm.css';
const miApi: string = (process.env.REACT_APP_miApi as string);

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${miApi}/login`, { username, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/';
    } catch (e: any) {
      setError(e.response.data.message);
      setError("ANDA MAL ESTOOO")
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <label htmlFor="username">Username: </label>
      <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)}/>

      <br/>
      <br/>

      <label htmlFor="password">Password: </label>
      <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}/>

      <br/>

      <p>{error}</p>

      <button type="submit">Login</button>

    </form>
  );
}

