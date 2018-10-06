
// URL for server running socket io
//export const socketServerURL = 'http://10.38.72.123:3000';
export const socketServerURL = 'http://192.168.0.11:3000';
//export const socketServerURL = 'http://192.168.43.170:3000';

export const singlePlayerQNos = 10;
export const multiPlayerQNos = 5;

// Open TDB details for single player quiz 
export const openTdbURL = `https://opentdb.com/api.php?amount=${singlePlayerQNos}&encode=url3986`;
export const openTdbTimeout = 10;
export const questionTimeout = 10; //in seconds

export const errorCodes = {
	1: "No Questions",
	2: "Invalid Room Id",
	3: "Server is experiencing load. Please try again after some time."
};