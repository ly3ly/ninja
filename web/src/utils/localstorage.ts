
interface UserInfoStore {
    username: string,
    token: string
}

const setlocalstore = (key: string, val: any) => {
    const data = <UserInfoStore>val;
    localStorage.setItem(key, JSON.stringify(data));
}

const getlocalstore = (key: string): UserInfoStore => {
    return JSON.parse(localStorage.getItem(key) || '{}');
}

const clearlocalstore = (key: string) => {
    localStorage.removeItem(key);
}

export {
    setlocalstore,
    getlocalstore,
    clearlocalstore
}