import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');
    const [update, setUpdate] = useState({
        firstName: '',
        lastName: '',
        credit: '',
        cash: '',
    });
    const params = useParams();
    const { firstName, lastName, credit, cash } = update;

    const onChange = (e) => {
        if ([e.target.name === 'amount'] || [e.target.name === 'credit']) {
            setUpdate({
                ...update,
                [e.target.name]: Number(e.target.value),
            });
        }
        setUpdate({ ...update, [e.target.name]: e.target.value });
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        setErr('');
        setMsg('');
        if (!firstName && !lastName && !credit && !cash)
            return setErr('Must fill at least one field');
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const body = update;
            const res = await axios.patch(
                `http://localhost:5000/api/users/${params.id}`,
                body,
                config
            );
            console.log(res.data);
            setMsg('User Updated');
        } catch (e) {
            setErr(e.response.data);
        }
        setUpdate({
            firstName: '',
            lastName: '',
            credit: '',
            cash: '',
        });
    };
    return (
        <div className="container">
            <h2 className="update-header">Update User</h2>
            <form className="update-form" onSubmit={(e) => onSubmit(e)}>
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
                        type="number"
                        placeholder="Cash"
                        name="cash"
                        onChange={(e) => onChange(e)}
                        value={cash}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        placeholder="Credit"
                        name="credit"
                        onChange={(e) => onChange(e)}
                        value={credit}
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Update</button>
                </div>
            </form>
            {msg && <h2 style={{ color: 'red' }}>{msg}</h2>}
            {err && <h2 style={{ color: 'red' }}>{err}</h2>}
        </div>
    );
};

export default Update;
