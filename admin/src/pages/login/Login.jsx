import React, { useContext, useState } from 'react';
import './Login.scss';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const [credentials, setCredentials] = useState({ username: undefined, password: undefined })
    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }

    const handleLogin = async e => {
        e.preventDefault();
        dispatch({ type: 'LOGIN_START' }) 
        try {
            const res = await axios.post('/auth/login', credentials);
            if(res.data.isAdmin) {
                dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
                navigate('/');
            }
            else {
                dispatch({ type: 'LOGIN_FAILURE', payload: { message: 'You are not authorized! Only Admin can login to this route.' } })
            }
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data })
        }
    } 

    return (
        <div className='login'>
            <div className='lContainer'>
                <input className='lInput' type='text' placeholder='Username' id='username' onChange={handleChange}  />
                <input className='lInput' type='password' placeholder='Password' id='password' onChange={handleChange}  />
                <button disabled={loading} className='lButton' onClick={handleLogin}>Login</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
}

export default Login