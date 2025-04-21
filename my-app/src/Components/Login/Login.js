import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import Header from '../PublicSite/Components/Header/header';

async function loginUser(credentials) {

    return fetch('http://localhost:8080/login', {

      method: 'POST',
      headers: {

        'Content-Type': 'application/json'
        
      },

      body: JSON.stringify(credentials)

    })
      .then(data => data.json());

}

export default function Login(props) {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const bridalParty = props.bridalParty;
  const setToken = props.setToken;

  const handleSubmit = async e => {

    e.preventDefault();

    const token = await loginUser({

      username,
      password

    });

    setToken(token);

  }
  
  return(

    <div>

      <Header fName={ bridalParty.groom.fName } sName={ bridalParty.bride.fName } displayPublic={ false } />
    
      <div className="login-wrapper">

        <h1 id="title">manange my wedding</h1>
        <div id="logIn">LOG IN</div>

        <form onSubmit={ handleSubmit }>

          <label> 

            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)}/>

          </label>

          <label>

            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)}/>

          </label>

          <div>

            <button type="submit">Submit</button>

          </div>

        </form>

      </div>

    </div>

  )

}

Login.propTypes = {

  setToken: PropTypes.func.isRequired

};