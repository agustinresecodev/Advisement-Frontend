
export const validateEmail = (email) => {
    if (email === '') {
        return 'Email is required';
    }else if (!/\S+@\S+\.\S+/.test(email)) {
        return 'Email is invalid';
    }
    return true;
}

export const validatePassword = (password) => {
    if (password.length === 0) {
        return 'Password is required';
    }else if (password.length < 6) {
        return 'Password must be 6 characters or more';
    }
    return true;
}

export const validateName = (name) => {
    if (!name) {
        return 'Name is required';
    }
    return true;
}

export const validatePhone = (phone) => {
    if (!phone) {
        return 'Phone is required';
    }
    return true;
}

export const validateAddress = (address) => {
    if (!address) {
        return 'Address is required';
    }
    return true;
}

export const validateCity = (city) => {
    if (!city) {
        return 'City is required';
    }
    return true;
}

export const validateZip = (zip) => {
    if (!zip) {
        return 'Zip is required';
    }
    return '';
}

export const validateCif = (cif) => {
    if (!cif) {
        return 'CIF is required';
    }
    return true;
}


