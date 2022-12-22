import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing(){
    return(
        <div className='landing'>
            <h1>Welcome</h1>
            <Link to="/home">
                <button className='landing'>Login</button>
            </Link>
        </div>
    )
}