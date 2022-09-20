import { useState } from 'react';
import './New.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import axios from 'axios';

const New = ({ inputs, title }) => {

    const [file, setFile] = useState('');
    const [info, setInfo] = useState({});

    const handleChange = (e) => {
        setInfo(prev=> ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    };

    const handleClick = async e => {
        e.preventDefault();

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'upload');

        try {
            const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/ogutujoseph/image/upload', data)

            const { url } = uploadRes.data;

            const newUser = {
                ...info,
                img: url
            };

            await axios.post('/auth/register', newUser);
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
                    <div className='left'>
                        {/* <img className='itemImg' alt='' src='/images/new/camera.jpg' />     */}
                        <img alt='' src={file ? URL.createObjectURL(file) : '/images/new/camera.jpg' } />
                    </div>
                    <div className='right'>
                        <form>
                            <div className='formInput'>
                                <label htmlFor='file'>Image: <DriveFolderUploadOutlinedIcon className='icon' /></label>
                                <input type='file' id='file' style={{ display: 'none' }} onChange={e => setFile(e.target.files[0])} />
                            </div>
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

export default New