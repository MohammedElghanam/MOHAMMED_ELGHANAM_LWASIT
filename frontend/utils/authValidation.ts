import { ValidationErrors } from '../types/validation';

function validate(...args: [string, string, string] | [string, string]): ValidationErrors {
    const errors: ValidationErrors = {
        name: '',
        email: '',
        password: '',
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (args.length === 3) { 
        const [name, email, password] = args;

        if (!name) {
            errors.name = 'Name is required';
        } else if (name.length < 3) {
            errors.name = 'must be at least 3 characters';
        }

        if (!email) {
            errors.email = 'Email is required';
        } else if (!emailPattern.test(email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }

    } else if (args.length === 2) { 
        const [email, password] = args;

        if (!email) {
            errors.email = 'Email is required';
        } else if (!emailPattern.test(email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!password) {
            errors.password = 'Password is required';
        } else if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }
    }

    return errors;
}

export { validate };
