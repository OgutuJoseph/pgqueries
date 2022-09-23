import { useState } from 'react';
import { configs } from '../../../config';
import './New.scss';
import Sidebar from '../../../components/sidebar/Sidebar';
import Navbar from '../../../components/navbar/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewTeacher = ({ inputs, title }) => {

    const baseUrl = configs.url;
    const navigate = useNavigate();
    const [info, setInfo] = useState({});

    const handleChange = (e) => {
        setInfo(prev=> ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    };

    const handleClick = async e => {
        e.preventDefault();

        try {

            const newTeacher = info 

            await axios({
                method: 'post',
                url: `${baseUrl}/teachers`,
                data: newTeacher
            })
            .then((res) => {
                if(res.status === 201){
                    console.log('Teacher Saved.')
                    navigate('/teachers')
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='new'>
            <Sidebar />
            <div className='newContainer'>
                <Navbar />
                <div className='top'>
                    <h1>{title}</h1>
                </div>
                <div className='bottom'> 
                    <div className='right'>
                        <form> 
                            {inputs.map((input) => (
                                <div className='formInput' key={input.id}>
                                    <label>{input.label}</label>
                                    <input type={input.type} placeholder={input.placeholder} onChange={handleChange} id={input.id} />
                                </div> 
                            ))}
                            <button onClick={handleClick}>Save</button>
                        </form>    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewTeacher;