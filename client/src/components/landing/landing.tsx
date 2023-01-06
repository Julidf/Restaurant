import React from 'react';
import LoginForm from './LoginForm';
import './Landing.css'
const miApi: string = (process.env.REACT_APP_miApi as string);

export default function Landing(){
    console.log(miApi);
    return(
        <div className='landing'>
            <h1>Welcome</h1>
            <LoginForm/>

        </div>
    )
}