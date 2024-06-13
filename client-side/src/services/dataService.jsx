import React from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/data';

export const getData = async () => {
    try
     {
        console.log('FETCHING DATA FROM API...');
        const response = await axios.get(API_URL);
        console.log(`DATA RESPONCE RECEIVED : `, response.data );
        return response.data;
     } catch (err){
        console.error(err);
        throw err;
     }
}


