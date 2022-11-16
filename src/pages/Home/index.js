import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Toast from '~/components/Toast';
import { isRequiredStaff } from '~/utils/specialRoute';

export default function Home() {
    const [state, setState] = useState(false);
    const handleOnClick = () => {};
    // console.log(isRequiredStaff());
    const isLogin = document.cookie !== '';
    console.log(isLogin);
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
            <button onClick={handleOnClick}>Create</button>
            {state && <Toast message="Dang nhap thanh cong" type="warning" />}{' '}
            {/* <Toast message="Dang nhap thanh cong" type="info" /> */}
            {/* <Toast message="Dang nhap thanh cong" type="error" /> */}
        </div>
    );
}
