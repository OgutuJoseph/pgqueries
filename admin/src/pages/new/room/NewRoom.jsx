import { useState } from 'react';
import './NewRoom.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';

const NewRoom = ({ inputs, title }) => {

    const [info, setInfo] = useState({});
    const [hotelId, setHotelId] = useState(undefined);
    const [rooms, setRooms] = useState([]);

    const { data, loading, error } = useFetch('/hotels');

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id] : e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const roomNumbers = rooms.split(',').map((room) => ({ number: room }));
        
        try {
            await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers })
        } catch (err) {
            console.log(err)
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
                    <div className='rightRoom'>
                        <form> 
                            {inputs.map((input) => (
                                <div className='formInput' key={input.id}>
                                    <label>{input.label}</label>
                                    <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange} />
                                </div> 
                            ))}
                            <div className='formInput'>
                                <label>Room Numbers</label>
                                <textarea onChange={e=>setRooms(e.target.value)} placeholder='Give comma between room numbers'></textarea>
                            </div>
                            <div className='formInput'> 
                                <label>Choose Hotel</label>
                                <select id='hotelId' onChange={e=>setHotelId(e.target.value)}>
                                    {loading ? 'Loading hotels...' : data && data.map(hotel=>(
                                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
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

export default NewRoom;