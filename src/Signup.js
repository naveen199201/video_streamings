import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/register/', formData);
            console.log(response.data);
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log(token)
            localStorage.setItem('user', response.data.username);
            localStorage.setItem('isAuthenticated', true);
            navigate('/home'); // Redirect to login page after successful sign-up
        } catch (error) {
            setError('Error signing up', error);
        }
    };

    return (
        <Container maxWidth="sm" className="signup-container"> 
            <Typography variant="h4" gutterBottom>
                Sign Up
            </Typography>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained" className='signup-button'>
                    Sign Up
                </Button>
                <Typography component="span">already registered <a href="/">Login</a></Typography>

            </form>
        </Container>
    );
};
export default SignUp;
