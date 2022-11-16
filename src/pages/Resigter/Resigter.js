import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Resigter.module.scss';
import ButtonInput from '~/components/ButtonInput/ButtonInput';
import TextInput from '~/components/TextInput/TextInput';
import Logo from '~/components/Logo/Logo';
import isEmpty from '~/validation/isEmpty';
import isEmail from '~/validation/isEmail';
import { resigter } from '~/services/resigter';
import { Link } from 'react-router-dom';
import Toast from '~/components/Toast';

const cx = classNames.bind(styles);

export default function Resigter() {
    const [username, setUsername] = useState({
        type: 'text',
        name: 'username',
        title: 'Tên tài khoản',
        value: '',
        messageErr: '',
        danger: true,
    });
    const [email, setEmail] = useState({
        type: 'email',
        name: 'email',
        title: 'Email',
        value: '',
        messageErr: '',
        danger: true,
    });
    const [password, setPassword] = useState({
        type: 'password',
        name: 'password',
        title: 'Mật khẩu',
        value: '',
        messageErr: '',
        danger: true,
    });
    var obj = { role: 'none', job: 'none' };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        for (const key in obj) {
            form.append(key, obj[key]);
        }
        const passForm = Object.fromEntries(form.entries());
        resigter(passForm);
    };
    return (
        <div className={cx('container')}>
            <form className={cx('content')} onSubmit={handleOnSubmit}>
                <Logo />
                <TextInput
                    type={username.type}
                    name={username.name}
                    notify={username.messageErr}
                    title={username.title}
                    danger
                />
                <TextInput type={email.type} name={email.name} notify={email.messageErr} title={email.title} danger />
                <TextInput
                    type={password.type}
                    name={password.name}
                    notify={password.messageErr}
                    title={password.title}
                    danger
                />

                <div className={cx('feature')}>
                    <input type="checkbox" id="rememberPS" name="checkbox" value="rememberPS" />
                    <label htmlFor="rememberPS" id="rememberPS">
                        Nhớ mật khẩu
                    </label>
                </div>
                <ButtonInput value={'Đăng ký'} />
            </form>
            <div className={cx('msg')}>
                Already have an account ?{' '}
                <Link className={cx('msg-link')} to="/login">
                    {' '}
                    Here
                </Link>
            </div>
        </div>
    );
}
