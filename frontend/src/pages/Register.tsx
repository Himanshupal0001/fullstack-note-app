import React, { useState } from 'react'
//import { registerForm } from '../types/registerType'
const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(formData);
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
