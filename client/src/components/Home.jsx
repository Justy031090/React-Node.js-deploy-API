import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <Fragment>
            <div className="container">
                <button
                    className="main-btn"
                    onClick={(e) => navigate(`/users/transfer`)}
                >
                    {' '}
                    Transfer
                </button>
                <button
                    className="main-btn"
                    onClick={(e) => navigate(`/users/`)}
                >
                    Watch Users
                </button>
                <button
                    className="main-btn"
                    onClick={(e) => navigate(`/users/create`)}
                >
                    Add Users
                </button>
            </div>
        </Fragment>
    );
};

export default Home;
