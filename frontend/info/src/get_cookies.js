function get_sessionid() {
    let sessionid;
    for (let obj of document.cookie.split(';')) {
        if (obj.split('=')[0].trim() == 'sessionid') {
            sessionid = obj.split('=')[1];
            break;
        }
    }
    return sessionid;
}

export {get_sessionid};
