import { getToLocalStorage } from './saveToBrowser';

export const isRequiredStaff = () => {
    const isData = getToLocalStorage('role');
    if (isData === '1') {
        return true;
    }
    return false;
};
