import React from 'react'

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

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
