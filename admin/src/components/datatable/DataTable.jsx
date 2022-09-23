import { useEffect, useState } from 'react';
import { configs } from '../../config';
import './DataTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLocation } from 'react-router-dom';
import useFetch from "../../hooks/useFetch";
import axios from 'axios';

const DataTable = ({ columns}) => {

    const [list, setList] = useState([]);

    // const { data, loading, error }  = useFetch('/users')
    const location = useLocation();
    const path = location.pathname.split('/')[1];
    const baseUrl = configs.url;

    const { data, loading, error }  = useFetch(`${baseUrl}/${path}`) 

    useEffect(() => {
        setList(data);
    }, [data])
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${baseUrl}/${path}/${id}`)
            setList(list.filter(item => item._id !== id))
        } catch (err) {
            
        }
    }

    const actionColumn = [
        { 
            field: 'action', 
            headerName: 'Action', 
            width: 200, 
            renderCell: (params) => {
                return (
                    <div className='cellAction'>
                        <Link to='/users/test' style={{ textDecoration:'none' }}>
                            <div className='viewButton'>View</div>
                        </Link>
                        <div className='deleteButton' onClick={() => handleDelete(params.row._id)}>Delete</div>
                    </div>
                )
            }
        }
    ]

    return (
        <div className='datatable'>
            <div className='datatableTitle'>
                <h2 style={{ textTransform: 'Capitalize' }}>All {path}</h2>
                <Link to={`/${path}/new`} style={{ textDecoration: 'none' }} className='link'>
                    Add New
                </Link>  
            </div>
            <DataGrid
                className='datagrid'
                rows={list}
                columns={columns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
                getRowId={row=>row._id}
            />
        </div>
    )
}

export default DataTable