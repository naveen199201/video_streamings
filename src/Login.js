import React, { useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./VideoSearch.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api-auth/', {
        username: username,
        password: password
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', username);
      localStorage.setItem('isAuthenticated', true);
      window.location.href = '/home'; // Redirect to home page
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container className="login-container" maxWidth="sm">
      <Typography variant="h2" gutterBottom>Login</Typography>
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={e => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={e => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button className='login-button'  variant="contained" onClick={handleLogin}>Login</Button>
      <Typography component="span">or <a href="/signup">signup</a></Typography>
    </Container>
  );
};

export default Login;
