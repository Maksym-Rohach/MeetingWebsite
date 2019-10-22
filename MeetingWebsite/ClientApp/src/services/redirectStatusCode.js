import history from '../utils/history';
export  default function redirectStatusCode(status) {
    if (status === 401) {
        history.push('login');
    }
    else if (status === 404) {
      history.push('');
    }
    else if (status === 500) {
      history.push('');
    }
}