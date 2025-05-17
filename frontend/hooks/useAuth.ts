import { useEffect, useState } from 'react';
import { RegisterSuccessResponse, LoginSuccessResponse, ErrorResponse } from '../types/authResponse';
import { validate } from '../utils/authValidation';
import axios from "axios";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useAuthContext } from '@/app/providers/auth-provider';

const useAuth = () => {

    const { login } = useAuthContext();
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({name:'', email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');

    const clearForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setErrors({ name: '', email: '', password: '' });
    };

    const handleErrors = (error: unknown) => {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const errResponse: ErrorResponse = error.response.data as ErrorResponse;
                setErrorMessage(errResponse.message || 'Server Error');
            } else if (error.request) {
                setErrorMessage('No response from server');
            } else {
                setErrorMessage('Error setting up request');
            }
        } else {
            setErrorMessage('Unexpected error occurred');
        }
    };

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
                clearForm();
                router.push('/login')
            }
            
        } catch (error: unknown) {
            handleErrors(error);
        }
    }

    const handleLogin = async (e: any) => {
        e.preventDefault()
        
        try {
            const errors = validate(email, password);
            if (errors.email || errors.password) {
                setErrors(errors);
                return;
            }
            const formData = {email, password}
            const response = await axios.post<LoginSuccessResponse>(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, formData);

            if (response.status === 200) {
                clearForm();
                console.log('ok');
                const token = response.headers?.authorization || response.headers?.Authorization;
                const user = response.data.user;
                
                if (token) {
                    const cleanToken = token.replace('Bearer ', '');
                    login(cleanToken, user);
                }
            }

        } catch (error: unknown) {
            handleErrors(error);
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