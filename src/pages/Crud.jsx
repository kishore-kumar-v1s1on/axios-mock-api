import React, { useState, useEffect } from "react";
import axios from 'axios'
const CRUD = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
    });

    const [editID, setEditID] = useState()

    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(0)

    const { username, email } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && email) {
            axios.post('https://jsonplaceholder.typicode.com/users', formData)
                .then(res => {
                    setData([...data, res.data]);
                    setFormData({ username: "", email: "" });

                })
                .catch(err => console.log(err))

        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (username && email) {
            axios.put(`https://jsonplaceholder.typicode.com/users/${editID}`, formData)
                .then(res => {
                    setFormData({ username: "", email: "" });
                    setRefresh(refresh + 1)
                })
                .catch(err => console.log(err))

        }
    };

    const handleDelete = (deleteID) => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${deleteID}`)
            .then(res => {
                const delUserdet = data.filter((to) => to.id !== deleteID);
                setData([...delUserdet]);
            })
            .catch(err => console.log(err))
    };

    const handleEdit = (editIDNotState) => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${editIDNotState}`)
            .then(res => {
                setFormData(res.data)

            })
            .catch(err => console.log(err))
    };

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => {
                setData(res.data)
            })
            .catch(err => console.log(err))
        // console.log(data);
    }, [refresh]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2 mt-2">
                    <h1> Mock API</h1>
                    <h3>CRUD Operations using axios</h3> 
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Name</label>
                            <input type="text" className="form-control" id="username" placeholder="Enter Name" name="username" value={username} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="body">Email</label>
                            <input type="text" className="form-control" id="email" placeholder="Enter Email" name="email" value={email} onChange={handleChange} />
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="submit" className="btn btn-primary" onClick={() => { handleUpdate() }}>Update</button>
                    </form>

                    <hr />

                    <table className="table table-striped">
                        <thead>
                            <tr>

                                <th>Username</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>

                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => {
                                            handleEdit(item.id)
                                            setEditID(item.id)
                                        }}>
                                            Edit
                                        </button>{" "}
                                        <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    );
};

export default CRUD;