import React from 'react';
import axios from 'axios';

export default function Home(){
    // const data = async() => await (await axios.get("http://localhost:8080/products")).data;
    // console.log(data);
    // const arrayData = data();
    // console.log(arrayData);
     
     
    const data = async() => {
        try {
          const response = await axios.get("http://localhost:8080/products");
          return response.data;
        } catch (error) {
          console.log(error);
        }
      };
      
      console.log(data());

    return(
        <div>
            <p>hola</p>
        </div>
    )
 
}

