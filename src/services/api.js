/**
 * Axios é utilizado para fazer as chamadas
 * http para uma API REST.
 */
import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:3000' //baseURL é url padrao que vai estar em todas as chamadas
});

export default api;