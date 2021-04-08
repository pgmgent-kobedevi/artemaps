const KEY_USER = 'KEY_USER'


const storage = {
    getUser: () => {
        const user = localStorage.getItem(KEY_USER);
        if(user) {
            return JSON.parse(user);
        }
        return null;
    },
    
    storeUser: (user) => {
        localStorage.setItem(KEY_USER, JSON.stringify(user));
    },
    
};

export default storage