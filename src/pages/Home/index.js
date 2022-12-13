import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <Link to="/resigter">Resigter</Link>
            <br />
            <Link to="/contact">contact</Link>
            <br />
            <Link to="/menu">Menu</Link>
            <br />
            <Link to="/home">Home</Link>
            <br />
            <Link to="/info">Info</Link>
            <br />
            <Link to="/login">Login</Link>
        </div>
    );
}
