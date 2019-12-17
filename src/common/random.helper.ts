export async function getRandomString(): Promise<string> {
    const abc = 'abcdefghijklmnopqrstuvwxyz';
    let res = '';
    while (res.length < 10) {
        res += abc[Math.floor(Math.random() * abc.length)];
    }
    return res;
}

export async function generateUuid(): Promise<string> {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    return uuid;
}
