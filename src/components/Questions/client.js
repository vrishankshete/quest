import axios from 'axios';
import {openTdbURL, openTdbTimeout} from '../../config/config';

export const fetchQuestionsOpentdb = ()=>axios.get(openTdbURL, {timeout: openTdbTimeout*1000}).catch((e)=>{throw e});