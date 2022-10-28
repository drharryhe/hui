import notify from '@/utils/notify'
import strings from '@/utils/strings'

function asyncRequestLocal(stdoutKey: string, api: string, params: any,
                           resolve: (data: any) => void, error?: (err: string) => void) {
    window.go.backend.API.AsyncRequestLocal(stdoutKey, api, params).then(
        (res: { error: string; data: any }) => {
            if (res.error !== '') {
                notify.error(strings.t('err_' + res.error.toString().replace(/ /g, '_')))
                if (error) {
                    error(res.error);
                }
            } else {
                resolve(res.data)
            }
        },
        (err: { toString: () => string }) => {
            notify.error(strings.t('err_' + err.toString().replace(/ /g, '_')))
            if (error) {
                error(err.toString());
            }
        }
    )
}

function requestLocalWithProgress(stdoutKey: string, api: string, params: any,
                                  resolve: (data: any) => void, error?: (err: string) => void) {
    window.go.backend.API.RequestLocalWithProgress(stdoutKey, api, params).then(
        (res: { error: string; data: any }) => {
            if (res.error !== '') {
                notify.error(strings.t('err_' + res.error.toString().replace(/ /g, '_')))
                if (error) {
                    error(res.error);
                }
            } else {
                resolve(res.data)
            }
        },
        (err: { toString: () => string }) => {
            notify.error(strings.t('err_' + err.toString().replace(/ /g, '_')))
            if (error) {
                error(err.toString());
            }
        }
    )
}

function requestLocal(api: string, params: any,
                      resolve: (data: any) => void, error?: (err: string) => void): void {
    window.go.backend.API.RequestLocal(api, params).then(
        (res: { error: string; data: any }) => {
            if (res.error !== '') {
                notify.error(strings.t('err_' + res.error.toString().replace(/ /g, '_')))
                if (error) {
                    error(res.error);
                }
            } else {
                resolve(res.data)
            }
        },
        (err: { toString: () => string }) => {
            notify.error(strings.t('err_' + err.toString().replace(/ /g, '_')))
            if (error) {
                error(err.toString());
            }
        }
    )
}

function requestServer(api: string, params: any,
                       callback: (data: any) => void,
                       error?: (err: string) => void): void {
    window.go.backend.API.RequestServer(api, params).then(
        (res: { error: string; data: any }) => {
            if (res.error !== '') {
                notify.error(strings.t('err_' + res.error.toString().replace(/ /g, '_')))
                if (error) {
                    error(res.error);
                }
            } else {
                callback(res.data)
            }
        },
        (err: { toString: () => string }) => {
            notify.error(strings.t('err_' + err.toString().replace(/ /g, '_')))
            if (error) {
                error(err.toString());
            }
        }
    )
}

export default {
    asyncRequestLocal,
    requestLocalWithProgress,
    requestLocal,
    requestServer
}