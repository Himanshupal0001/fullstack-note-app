import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { AppDispatch, RootState } from '../store';

export interface ILoginUser {
    email: string,
    password: string
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { user, isLoading, isError, isSuccess, message } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset());
    }

        , [user, isError, isSuccess, message, navigate, dispatch])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();
        console.log(formData);
        const userData: ILoginUser = { email, password };
        dispatch(login(userData));
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>Login</h1>
                <p>Please Login to your account</p>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input type='email' className='form-control' id='email' value={email} name='email' placeholder='Enter your email' onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <input type='password' className='form-control' id='password' value={password} name='password' placeholder='Enter your password' onChange={handleChange} />
                    </div>

                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login
