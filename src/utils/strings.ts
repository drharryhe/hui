import i18n from '@/i18n'

const t = (msg: string): string => {
    return i18n.global.t(msg)
}

const time = (timestamp: number): string => {
    let add0 = function (m: number): string {
        return m < 10 ? '0' + m.toString() : m.toString();
    }

    let time = new Date(timestamp)    //先将时间戳转为Date对象，然后才能使用Date的方法
    let year = time.getFullYear(),
        month = time.getMonth() + 1,  //月份是从0开始的
        day = time.getDate(),
        hour = time.getHours(),
        minute = time.getMinutes(),
        second = time.getSeconds()

    return year + '-' + add0(month) + '-' + add0(day) + ' ' + add0(hour) + ':' + add0(minute) + ':' + add0(second)

}

export default {
    t,
    time,
};