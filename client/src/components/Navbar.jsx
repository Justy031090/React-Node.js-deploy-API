import React from 'react';
import { Link } from 'react-router-dom';

const styleUL = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'indigo',
};
const styleLI = {
    padding: '1rem',
    color: 'indigo',
    textDecoration: 'none',
    listStyleType: 'none',
    fontSize: '2rem',
};

const Navbar = () => {
    return (
        <nav>
            <ul style={styleUL}>
                <li style={styleLI}>
                    <Link style={styleLI} to="/">
                        Home
                    </Link>
                </li>
                <li style={styleLI}>
                    <Link style={styleLI} to="/users">
                        Users
                    </Link>
                </li>
                <li style={styleLI}>
                    <Link style={styleLI} to="/users/transfer">
                        Transfer
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
