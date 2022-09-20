import React, { Fragment, useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const EditTodo = ({ todo }) => {
    console.log('todo', todo);

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
    setIsOpen(true);
    }

    function closeModal() {
    setIsOpen(false);
    }

    const [description, setDescription] = useState(todo.description);

    //Edit Description
    const updateDescription = async (e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })

            window.location = '/';
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>  
            <button onClick={openModal} className='btn btn-warning'>Edit</button>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                
                <div>
                    <div>Edit To-Do</div>
                    <hr />
                    <form>
                    <input type='text' className='form-control' value={description} onChange={e => setDescription(e.target.value)} />
                    </form>
                </div>
                <hr />                
                <div> 
                    <button onClick={e => updateDescription(e)} className='btn btn-warning'>Update</button>
                    <button onClick={closeModal} className='btn btn-danger'>Cancel</button>
                </div>
                
            </Modal>
        </Fragment>
    
    )
        
};

export default EditTodo;