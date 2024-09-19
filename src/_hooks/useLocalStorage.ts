export default function useLocalStorage() {
    const setLocalStorage = (item: string | null, value: string) => {
        switch (item) {
            case 'accessToken': localStorage.setItem('accessToken', value);
                break;
            case 'refreshToken': localStorage.setItem('refreshToken', value);
                break;
            case 'userId': localStorage.setItem('userId', value);
                break;
        }
    };

    const getLocalStorage = (item: string) => {
        let valueType: string | null = '';
        switch (item) {
            case 'accessToken':
                valueType = localStorage.getItem('accessToken');
                break;
            case 'refreshToken':
                valueType = localStorage.getItem('refreshToken');
                break;
            case 'userId':
                valueType = localStorage.getItem('userId');
                break;
        }
        return valueType;
    };

    return { setLocalStorage, getLocalStorage };
}