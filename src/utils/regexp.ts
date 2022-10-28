function isEmail(str: String): Boolean {
    let pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;

    return pattern.test(str.toString())
}

export default {
    isEmail,
}