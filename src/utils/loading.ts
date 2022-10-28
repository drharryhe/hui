import {Loading} from 'quasar';


const show = (message: string, dark?: boolean) => {
    Loading.show({
        message: message,
        boxClass: dark ? 'text-bold loading-box-dark' : 'text-bold loading-box-light',
        spinnerColor: 'secondary'
    });
};

const hide = () => {
    Loading.hide();
}

export default {
    show,
    hide,
};