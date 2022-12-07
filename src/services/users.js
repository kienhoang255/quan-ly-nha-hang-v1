import axios from 'axios';
import { actions } from '~/store';
import { getToLocalStorage, removeItemFromLS, setToLocalStorage } from '~/utils/saveToBrowser';
import { day, headers, hour, minute, month, URL, year } from './index';

export const login = (data, dispatch) => {
    axios
        .post(`${URL}user/login`, data)
        .then((res) => {
            document.cookie = `token=${res.data.accessToken}`;
            const state = {
                _id: res.data._id,
                email: res.data.email,
                phone: res.data.phone,
                username: res.data.username,
                role: res.data.role,
                job: res.data.job,
            };
            setToLocalStorage('user', state);
            dispatch(actions.setMessage({ type: 'success', message: 'Đăng nhâp thành công' }));
        })
        .catch((err) => {
            dispatch(actions.setMessage({ type: 'error', message: 'Tài khoản/mật khẩu không chính xác' }));
        });
};

export const resigter = (data) => {
    axios.post(`${URL}user/create`, data).then((res) => {});
};

export const test = () => {
    axios.get(`${URL}user/test`, headers).then((res) => {});
};

export const logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    removeItemFromLS('user');
};

const staff = getToLocalStorage('user');
const dataCheckIn = {
    staff_id: staff?._id,
    hour: hour,
    minute: minute,
    day: day,
    month: month,
    year: year,
};
export const checkIn = () => {
    axios.post(`${URL}shift/create`, dataCheckIn, headers).then((res) => {});
};

export const getCheckIn = () => {
    axios.post(`${URL}shift/create`, dataCheckIn, headers).then((res) => {});
};
