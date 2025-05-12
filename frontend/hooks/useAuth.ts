import { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';

const useAuth = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState();

    const handleRegister = async (e: any) => {
        e.preventDefault()
        
        const formData = { name, email, password}
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, formData);

            if (response.status === 201) {
                console.log('dkhal hna');
                console.log(response);
                
                
                setEmail('');
                setPassword('');
                // localStorage.setItem('token', response.data.token);
                // navigate('/login')
            }
            
        } catch (error) {
            
        }
    }

    const handleLogin = async (e: any) => {
        e.preventDefault()
        
        const formData = {email, password}
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, formData);

            if (response.status === 200) {
                console.log('dkhal hna');
                console.log(response.data.token);
                
                
                setEmail('');
                setPassword('');
                // localStorage.setItem('token', response.data.token);
                // navigate('/login')
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