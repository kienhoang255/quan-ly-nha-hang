import moment from 'moment';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Toast from '~/components/Toast';
import { headers } from '~/services';
import { test } from '~/services/users';
import { isRequiredStaff } from '~/utils/specialRoute';

export default function Home() {
    const [state, setState] = useState(false);
    const handleOnClick = () => {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        console.log('click');
    };
    const isLogin = document.cookie;

    // console.log(isRequiredStaff());
    console.log(isLogin);
    const dateTime = new Date();
    // console.log(dateTime.getDay());
    // test();
    // console.log(headers);
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
