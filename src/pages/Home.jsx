import React, { useEffect, useState } from 'react'
import useAuthContext from '../context/AuthContext'
import moment from 'moment';
import axios from '../api/axios'
const Home = () => {
  const { user, csrf } = useAuthContext()
  const formRef = React.useRef(null);
  const [data, setData] = useState([]);
  const[name, setName] = useState("")
  const[description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState("");
    const [ename, setNewname] = useState('')
    const [edescription, setNewdescription] = useState('')
    const [eid, setEid] = useState("")
    const [ update, setUpdate ] = useState("");
    const [success, setSuccess] = useState("")
    const handleNameChange = (e) => {
    setNewname(e.target.value);
    }
    const handleDescriptionChange = (e) => {
    setNewdescription(e.target.value);
    }
    const showDetails = async (id) => {
        const response = await axios.get(`/write/edit/${id}`)
        setNewname(response.data.name),
        setNewdescription(response.data.description),
        setEid(response.data.id)
      }

      const deleteData = async (id) => {
        
        try {
          await axios.get(`/write/delete/${id}`)
        } catch (error) {
          console.log(error)
        }
        
      }
    const handleEdit = async (e) => {
        e.preventDefault();
        await csrf();
        setErrors([])
        setStatus(null)
         
        try {
          await axios.post(`/write/update/${eid}`, {name :ename, description: edescription});
          setUpdate("Updated Successfully");

        } catch (error) {
            console.log(error)
        }
      
      }



  useEffect(() => {
    axios.get('/writes').then(response => {
      setData(response.data);
    })
  }, [data])

  

  // console.log(data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    await csrf();
    setErrors([])
    setStatus(null)
    
    try {
        await axios.post("/write", {name, description});
        setSuccess("Data Inserted")
        setName("")
        setDescription("")
    } catch (error) {
        if(error.response.status === 422){
            setErrors(error.response.data.errors)
        }
    }

}

  return (
    <>
    <div className='d-flex'>
      <div className='fs-4'> Welcome {user?.name}!</div>
      <button className='btn btn-primary shadow ms-3' data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@getbootstrap">Add Note</button>
    </div>

    <table className="table table-borderless table-striped table-hover mt-5">
      <thead>
        <tr >
          <th scope="col">Title</th>
          <th scope="col">Created</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(l => {
            return <tr key={l.id}>
            <th className='text-dark'>{l.name}</th>
            <td>{moment(l.created_at).fromNow()}</td>
            <td>
            <button className='btn btn-primary shadow ms-3' onClick={() => showDetails(l.id)} data-bs-toggle="modal" data-bs-target="#edit" >Edit</button>
            <button className='btn btn-outline-danger shadow ms-3' onClick={() => deleteData(l.id)}>Delete</button>
            
            </td>
          </tr>
        })}
      </tbody>
    </table>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Get Started</h1>
            
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">x</button>
          </div>
          <div className="modal-body">
            <div className='text-success'>{success}</div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label for="recipient-name" className="col-form-label">Title</label>
                <input type="text"  value={name}
                onChange={(e) => setName(e.target.value)} className="form-control p-3" id="recipient-name"/>
                {errors.name && <div className='text-danger'>{errors.name[0]}</div>}
              </div>
              <div className="mb-3">
                <label for="message-text" className="col-form-label">Content</label>
                <textarea value={description}
                onChange={(e) => setDescription(e.target.value)} className="form-control p-2" id="message-text"></textarea>
                {errors.description && <div className='text-danger'>{errors.description[0]}</div>}
              </div>
              <button type='submit'  className="btn btn-primary shadow">Save</button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
    
    <div className="modal fade" id="edit" tabIndex="-1" aria-labelledby="editLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editLabel">Get Started</h1>
            <button type="button" className="btn-close rounded-circle" data-bs-dismiss="modal" aria-label="Close">X</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleEdit}>
              <div className='text-success'>{update}</div>
              <div className="mb-3">
                <label for="recipient-name" className="col-form-label">Title</label>
                <input type="hidden" value={eid} name="hidden" ref={formRef} />
                <input type="text"  value={ename} 
                onChange={handleNameChange} className="form-control p-3" id="recipient-name"/>
                {errors.name && <div className='text-danger'>{errors.name[0]}</div>}
              </div>
              <div className="mb-3">
                <label for="message-text" className="col-form-label">Content</label>
                <textarea value={edescription} 
                onChange={handleDescriptionChange} className="form-control p-2" id="message-text">{edescription}</textarea>
                {errors.description && <div className='text-danger'>{errors.description[0]}</div>}
              </div>
              <button type='submit'  className="btn btn-primary shadow">Update</button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
     
    </>

  )
}

export default Home