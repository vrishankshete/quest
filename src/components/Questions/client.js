import axios from 'axios';

export const fetchQuestionsServer = ()=>axios.get('http://192.168.43.170:3000/questions', {timeout: 20*1000}).catch((e)=>{throw e});
export const fetchQuestionsOpentdb = ()=>axios.get('https://opentdb.com/api.php?amount=10&encode=url3986', {timeout: 20*1000}).catch((e)=>{throw e});