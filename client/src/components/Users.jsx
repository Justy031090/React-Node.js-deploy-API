import React, { useState, Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };
                const res = await axios.get(
                    'http://localhost:5000/api/users/',

                    config
                );
                setData(res.data);
            } catch (e) {
                console.log(e.response);
            }
        };
        getData();
    }, []);
    const renderData = () => {
        return data.map((user) => {
            return (
                <div key={user._id} className="container">
                    <h2>User:</h2>
                    <span>First Name: {user.firstName}</span>
                    <span>Last Name: {user.lastName}</span>
                    <button onClick={(e) => navigate(`/api/user/${user._id}`)}>
                        Check
                    </button>
                </div>
            );
        });
    };
    return <Fragment>{data && <div>{renderData()}</div>}</Fragment>;
};

export default Users;
