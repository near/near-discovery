type FormatError = {
    name: string;
    message: string;
}

const regErrMsg = /([^(]+)\(/

export function formatException(errMsg: string): string {
    let _msg = ''
    const res = errMsg.match(regErrMsg)
    if (res && res.length > 1) {
        _msg = res[1]
        return _msg
    }

    return errMsg
}

export function isNumeric(value: any): boolean {
    return /^[0-9]+(\.)?([0-9]+)?$/.test(value);
}