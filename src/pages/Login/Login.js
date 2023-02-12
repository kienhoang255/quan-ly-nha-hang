import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import ButtonInput from '~/components/ButtonInput/ButtonInput';
import TextInput from '~/components/TextInput/TextInput';
import Logo from '~/components/Logo/Logo';
import { useStore } from '~/store';
import { login } from '~/services/users';
import Toast from '~/components/Toast';
import isEmpty from '~/validation/isEmpty';
import isEmail from '~/validation/isEmail';
import { isPhoneNumber } from '~/validation/isPhone';
import SelectPopup from '~/components/SelectPopup/SelectPopup';
import Button from '~/components/Button/Button';
import { BsExclamationLg } from 'react-icons/bs';
import { getToLocalStorage } from '~/utils/saveToBrowser';

const cx = classNames.bind(styles);

export default function Login() {
    const [showToast, setShowToast] = useState(false);
    const [usedAccount, setUsedAccount] = useState();
    const [state, dispatch] = useStore();

    const [email, setEmail] = useState({
        type: 'text',
        name: 'email',
        title: 'Email',
        value: '',
        messageErr: '',
    });
    const [password, setPassword] = useState({
        type: 'password',
        name: 'password',
        title: 'Mật khẩu',
        value: '',
        messageErr: '',
    });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const passForm = Object.fromEntries(form.entries());

        const isEmptyEmail = isEmpty(passForm, 'email');
        const isEmptyPassword = isEmpty(passForm, 'password');
        const checkPhone = isPhoneNumber(passForm.email);
        const isCorrectEmail = isEmail(passForm);

        if (!isEmptyEmail) setEmail({ ...email, messageErr: 'Không được để trống' });
        else setPassword({ ...password, messageErr: '' });

        if (!isCorrectEmail) {
            if (!checkPhone) setEmail({ ...email, messageErr: 'Đây không phải SDT hoac email' });
            else setEmail({ ...email, messageErr: '' });
        } else setEmail({ ...email, messageErr: '' });

        if (!isEmptyPassword) setPassword({ ...password, messageErr: 'Không được để trống' });
        else setPassword({ ...password, messageErr: '' });

        if (isEmptyEmail && isEmptyPassword && (checkPhone || isCorrectEmail)) {
            login(passForm, dispatch, passForm);
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 2000);
        }
    };

    useEffect(() => {
        setUsedAccount(getToLocalStorage('usedAccount'));
    }, []);

    const onSelectAccount = (info) => {
        setEmail({ ...email, value: info.email });
        setPassword({ ...password, value: info.password });
    };
    return (
        <div className={cx('container')}>
            <form className={cx('content')} onSubmit={handleOnSubmit}>
                <Logo />
                <TextInput
                    type={email.type}
                    name={email.name}
                    title={email.title}
                    notify={email.messageErr}
                    value={email.value}
                    danger
                    onChange={(e) => setEmail({ ...email, value: e.target.value })}
                />

                <TextInput
                    type={password.type}
                    name={password.name}
                    title={password.title}
                    notify={password.messageErr}
                    value={password.value}
                    danger
                    onChange={(e) => setPassword({ ...password, value: e.target.value })}
                />

                {/* <input onChange={(e) => setPassword({ ...password, value: e.target.value })} /> */}

                {/* <div className={cx('feature')}>
                    <input type="checkbox" id="rememberPS" name="checkbox" value="rememberPS"  />
                    <label htmlFor="rememberPS" id="rememberPS">
                        Nhớ mật khẩu
                    </label>
                </div> */}

                <ButtonInput value={'Đăng nhập'} />
                <SelectPopup usedAccount={usedAccount} onSelectAccount={onSelectAccount}>
                    <Button type="button" variant="circle" className={cx('hint')}>
                        <BsExclamationLg />
                    </Button>
                </SelectPopup>
            </form>
            {showToast && <Toast message={state.MESSAGE.message} type={state.MESSAGE.type} />}
        </div>
    );
}
