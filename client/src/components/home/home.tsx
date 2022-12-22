import React from 'react';
import axios from 'axios';

export default function Home(){
    // const data = async() => await (await axios.get("http://localhost:8080/products")).data;
    // console.log(data);
    // const arrayData = data();
    // console.log(arrayData);
     
     
    // const data = async() => {
    //     try {
    //       const response = await axios.get("http://localhost:8080/products");
    //       return response.data;
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };
      
    //   console.log(data());


      async function login() {
        let usuarios: any[] = [];
        try {
          const response = await axios.get("http://localhost:8080/api/products");
          usuarios = response.data;
          console.log(usuarios)
        } catch (error) {
          console.log(error);
        }
      }

    

    return(
        <div>
            <p>hola</p>
            <button onClick={login}>
            Click Me!
            </button>
        </div>
    )
 
}

