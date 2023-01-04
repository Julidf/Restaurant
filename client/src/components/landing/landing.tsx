import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import './Landing.css'

export default function Landing(){
    return(
        <div className='landing'>
            <h1>Welcome</h1>
            <LoginForm/>

        </div>
    )
}