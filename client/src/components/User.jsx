import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const User = () => {
    const [user, setUser] = useState({});
    const params = useParams();
    const { cash, credit, firstName, lastName, created, email } = user;
    useEffect(() => {
        const getData = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const res = await axios.get(
                    `http://localhost:5000/api/users/${params.id}`,

                    config
                );
                setUser(res.data);
            } catch (e) {
                console.log(e.response);
            }
        };
        if (!user.email) {
            getData();
        }
    }, [params.id, user]);
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
            </div>
        );
    };
    return <Fragment>{user && render()}</Fragment>;
};

export default User;
