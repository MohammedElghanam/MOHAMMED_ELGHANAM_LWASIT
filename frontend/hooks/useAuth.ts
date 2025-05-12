import { useState } from 'react';
import { RegisterSuccessResponse, LoginSuccessResponse, ErrorResponse } from '../types/authResponse';
import { validate } from '../utils/authValidation';
import axios from "axios";
import { useRouter } from 'next/router';

const useAuth = () => {
    
    // const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({name:'', email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async (e: any) => {
        e.preventDefault()
        
        try {
            const errors = validate(name, email, password);
            if (errors.name || errors.email || errors.password) {
                setErrors(errors);
                return;
            }

            const formData = { name, email, password}
            const response = await axios.post<RegisterSuccessResponse>(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, formData);

            if (response.status === 201) {
                setName('');
                setEmail('');
                setPassword('');
                // router.push('/login');
            }
            
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const errResponse: ErrorResponse = error.response.data as ErrorResponse;
                    setErrorMessage(errResponse.message || 'Server Error');
                    console.error('Error registering user:', errResponse.message);
                }
                else if (error.request) {
                    setErrorMessage('No response from server');
                    console.error('No response received:', error.request);
                } 
                else {
                    setErrorMessage('Error setting up request');
                    console.error('Error setting up request:', error.message);
                }
            } else {
                setErrorMessage('Unexpected error occurred');
                console.error('Unexpected error:', error);
            }
        }
    }

    const handleLogin = async (e: any) => {
        e.preventDefault()
        
        const formData = {email, password}
        try {
            const response = await axios.post<LoginSuccessResponse>(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, formData);

            if (response.status === 200) {
                console.log(response.data.token);
                setEmail('');
                setPassword('');
                localStorage.setItem('token', response.data.token);
            }

        } catch (error) {
            
        }
    }


  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleRegister,
    handleLogin,
    errors,
    setErrors,
    errorMessage,
    setErrorMessage
  }
}

export default useAuth