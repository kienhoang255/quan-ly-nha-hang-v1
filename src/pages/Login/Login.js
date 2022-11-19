import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import ButtonInput from '~/components/ButtonInput/ButtonInput';
import TextInput from '~/components/TextInput/TextInput';
import Logo from '~/components/Logo/Logo';
import { useStore } from '~/store';
import { login } from '~/services/login';
import Toast from '~/components/Toast';
import isEmpty from '~/validation/isEmpty';
import isEmail from '~/validation/isEmail';
import { Link, useNavigate } from 'react-router-dom';
import { isRequiredStaff } from '~/utils/specialRoute';

const cx = classNames.bind(styles);

export default function Login() {
    const [state, dispatch] = useStore();

    const [email, setEmail] = useState({
        type: 'email',
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

    const navigate = useNavigate();
    const from = isRequiredStaff() ? '/info' : '/';

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const passForm = Object.fromEntries(form.entries());

        const isEmptyEmail = isEmpty(passForm, 'email');
        const isEmptyPassword = isEmpty(passForm, 'password');
        const isCorrectEmail = isEmail(passForm);

        if (!isEmptyEmail) setEmail({ ...email, messageErr: 'Không được để trống' });
        else if (!isCorrectEmail) setEmail({ ...email, messageErr: 'Đây không phải email' });
        else setEmail({ ...email, messageErr: '' });

        if (!isEmptyPassword) setPassword({ ...password, messageErr: 'Không được để trống' });
        else setPassword({ ...password, messageErr: '' });

        if (isEmptyEmail && isEmptyPassword && isCorrectEmail) {
            login(dispatch, passForm);
            navigate(from, { replace: true });
        }
    };

    return (
        <div className={cx('container')}>
            <form className={cx('content')} onSubmit={handleOnSubmit}>
                <Logo />
                <TextInput type={email.type} name={email.name} title={email.title} notify={email.messageErr} danger />
                <TextInput
                    type={password.type}
                    name={password.name}
                    title={password.title}
                    notify={password.messageErr}
                    danger
                />

                <div className={cx('feature')}>
                    <input type="checkbox" id="rememberPS" name="checkbox" value="rememberPS" />
                    <label htmlFor="rememberPS" id="rememberPS">
                        Nhớ mật khẩu
                    </label>
                </div>

                <ButtonInput value={'Đăng nhập'} />
            </form>
            <div className={cx('msg')}>
                Don't have an account ?{' '}
                <Link className={cx('msg-link')} to="/resigter">
                    {' '}
                    Here
                </Link>
            </div>
        </div>
    );
}