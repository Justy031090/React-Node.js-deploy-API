import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');
    const [create, setCreate] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const { firstName, lastName, email } = create;

    const onChange = (e) => {
        setCreate({ ...create, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        setErr('');
        setMsg('');
        if (!firstName || !lastName || !email)
            return setErr('Must provide all fields');
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const body = create;
            const res = await axios.post(
                `http://localhost:5000/api/users/`,
                body,
                config
            );
            console.log(res.data);
            setMsg('User Created');
        } catch (e) {
            setErr(e.response.data);
        }
        setCreate({
            firstName: '',
            lastName: '',
            email: '',
        });
    };
    return (
        <div className="container">
            <h2 className="create-header">Add User</h2>
            <form className="create-form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={(e) => onChange(e)}
                        value={firstName}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={(e) => onChange(e)}
                        value={lastName}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => onChange(e)}
                        value={email}
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Add</button>
                </div>
            </form>
            {msg && <h2 style={{ color: 'red' }}>{msg}</h2>}
            {err && <h2 style={{ color: 'red' }}>{err}</h2>}
        </div>
    );
};

export default CreateUser;
