import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import { getFood } from '~/services/food';
import { actions, useStore } from '~/store';

export default function Home() {
    const [state, dispatch] = useStore();

    // useEffect(() => {
    //     if (state.FOODS[0] === undefined) {
    //         // dispatch(actions.getFood());
    //     }
    // });

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
