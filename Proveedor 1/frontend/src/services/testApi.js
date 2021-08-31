import axios from 'axios';

export const TestGettingData = () =>{
    return axios.get('http://localhost:5000/products').then(res => console.log(res));
}