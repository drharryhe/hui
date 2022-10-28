import {Notify} from 'quasar';
import {ionCheckmarkOutline, ionCloseOutline,ionWarning} from '@quasar/extras/ionicons-v6'

const error = (message: string) => {
    Notify.create({
        message: message,
        icon: ionCloseOutline,
        type: 'negative',
        position:'top',
    });
};

const success = (message: string) => {
    Notify.create({
        message: message,
        icon: ionCheckmarkOutline,
        position:'top',
        type: 'positive',
    });
};

const info = (message:string) =>{
    Notify.create({
        message:message,
        icon:ionWarning,
        position:'top-right',
        type:'info'
    })
}

export default {
    error,
    success,
    info,
};