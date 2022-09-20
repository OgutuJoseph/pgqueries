import { useState } from 'react';
import './NewHotel.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined'
import { hotelInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

const NewHotel = () => {

    const [files, setFiles] = useState('');    
    const [info, setInfo] = useState({});
    const [rooms, setRooms] = useState([]);

    /**  get rooms for selection */
    const { data, loading, error } = useFetch('/rooms')

    const handleChange = (e) => {
        setInfo((prev)=> ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    };

    const handleSelect = (e) => {
        const value = Array.from(e.target.selectedOptions, (option) => option.value);
        setRooms(value);
    };

    const handleClick = async e => {
        e.preventDefault();

        try {
            const list = await Promise.all(
                Object.values(files).map(async (file)=>{
                    const data = new FormData();
                    data.append('file', file);
                    data.append('upload_preset', 'upload');

                    const uploadRes = await axios.post('https://api.cloudinary.com/v1_1/ogutujoseph/image/upload', data)

                    const { url } = uploadRes.data;
                    return url;
                }
            ));

            const newHotel = {
                ...info, rooms, photos: list
            };
            console.log('new hotel: ', newHotel)
            await axios.post('/hotels', newHotel)
        } catch (err) {
            console.log('err: ', err)
        }
    }

    return (
        <div className='new'>
            <Sidebar />
            <div className='newContainer'>
                <Navbar />
                <div className='top'>
                    <h1>Add New Hotel</h1>
                </div>
                <div className='bottom'>
                    <div className='left'>
                        {/* "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"   */} 
                        <img src={files ? URL.createObjectURL(files[0]) : "/images/new/camera.jpg" } alt="" />
                    </div>
                    <div className='right'>
                        <form>
                            <div className='formInput'>
                                <label htmlFor='file'>Image: <DriveFolderUploadOutlinedIcon className='icon' /></label>
                                <input type="file" id="file" multiple onChange={(e) => setFiles(e.target.files)} style={{ display: "none" }} />
                            </div>
                            {hotelInputs.map((input) => (
                                <div className='formInput' key={input.id}>
                                    <label>{input.label}</label>
                                    <input type={input.type} placeholder={input.placeholder} id={input.id} onChange={handleChange} />
                                </div> 
                            ))}
                            <div className='formInput'>
                                <label>Featured</label>
                                <select id='featured' onChange={handleChange}>
                                    <option value={false}>No</option>
                                    <option value={true}>Yes</option>
                                </select>
                            </div> 
                            <div className='selectRooms'>
                                <label>Select Room(s) [Press CTRL + option(s) to choose mutliple]</label>
                                <select id='rooms' multiple onChange={handleSelect}>
                                    <option disabled>Rooms</option>
                                    {loading ? 'Loading Rooms...' : data && data.map(room=>(
                                        <option key={room._id} value={room._id}>{room.title}</option>
                                    ))}
                                </select>
                            </div> 
                            <button onClick={handleClick}>Save</button>
                        </form>    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewHotel;