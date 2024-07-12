import React, { useEffect, useState } from 'react'
import { IRegisterForm } from '../types/registerType'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { AppDispatch, RootState } from '../store';
import { IUserData } from '../types/registerType';
const Register: React.FC = () => {
    const [formData, setFormData] = useState<IRegisterForm>({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

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
        if (password !== password2) {
            toast.error('Password do not match');
        }
        else {
            const userData: IUserData = { name, email, password };
            dispatch(register(userData));
        }
        //console.log(formData);
    }

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <section className="heading">
                <h1>Register</h1>
                <p>Please create an account</p>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <input type='text' className='form-control' id='name' value={name} name='name' placeholder='Enter your name' onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <input type='email' className='form-control' id='email' value={email} name='email' placeholder='Enter your email' onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <input type='password' className='form-control' id='password' value={password} name='password' placeholder='Enter your password' onChange={handleChange} />
                    </div>
                    <div className='form-group'>
                        <input type='password' className='form-control' id='password2' value={password2} name='password2' placeholder='Enter your confirm password' onChange={handleChange} />
                    </div>

                    <div className='form-group'>
                        <button type='submit' className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register;
