import axios from 'axios';
export const fetchQuestionsServer = ()=>axios.get('http://192.168.0.13:3000/questions', {timeout: 6*1000});