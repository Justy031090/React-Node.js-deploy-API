import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const User = () => {
    const [user, setUser] = useState({});
    const [err, setErr] = useState('');
    const params = useParams();
    const navigate = useNavigate();
    const { cash, credit, firstName, lastName, created, email, id } = user;
    useEffect(() => {
        const getData = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const res = await axios.get(`/api/users/${params.id}`, config);
                setUser(res.data);
            } catch (e) {
                console.log(e.response);
            }
        };
        if (!user.email) {
            getData();
        }
    }, [params.id, user]);

    const deleteUser = async () => {
        try {
            await axios.delete(`/api/users/${params.id}`);
            navigate('/api/users');
        } catch (e) {
            setErr(e.response);
        }
    };
    const render = () => {
        return (
            <div className="container">
                <h2>User's Info</h2>
                <span>Name: {firstName}</span>
                <span>Lastname: {lastName}</span>
                <span>Email: {email}</span>
                <span>Credit: {credit}</span>
                <span>Cash: {cash}</span>
                <span>Member Since: {created}</span>
                <div className="user-btn">
                    <button onClick={(e) => deleteUser()}>Delete User</button>
                    <button
                        onClick={(e) => navigate(`/api/users/update/${id}`)}
                    >
                        Change Details
                    </button>
                </div>
            </div>
        );
    };
    return (
        <div className="container">
            {user && render()}
            {err && <h2 style={{ color: 'red' }}> {err}</h2>}
        </div>
    );
};

export default User;
