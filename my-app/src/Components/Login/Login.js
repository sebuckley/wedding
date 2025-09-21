import React, { useState } from 'react';
import './Login.css';
import Header from '../Wigits/Header/header';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login(props) {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const bridalParty = props.bridalParty;
  const setUser = props.setUser;
  const setLoading = props.setLoading;
  const setLoggedIn = props.setLoggedIn;

  const handleLogin = async (e) => {

    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // User signed in
      const user = userCredential;
      setUser(user);
      setLoading(false);
      setLoggedIn(true);

    })
    .catch((error) => {

      console.error(error.message);
      
    });

  };
  
  return(

    <div>

      <Header fName={ bridalParty.first.fName } sName={ bridalParty.second.fName } displayPublic={ true } logInPage={ true }/>
    
      <div className="login-wrapper">

        <h1 id="title">manange my wedding</h1>
        <div id="logIn">LOG IN</div>

        <form onSubmit={ handleLogin }>

          <div className="row flexColumn">
            <div className="col-12"> Username</div>
            <div className="col-12"><input type="text" className="inputBox3" onChange={e => setEmail(e.target.value)}/></div>
          </div>

           <div className="row flexColumn">
            <div className="col-12"> Password</div>
            <div className="col-12">
              <input type="password" className="inputBox3" onChange={e => setPassword(e.target.value)}/>
            </div>
          </div>

          <div className="row">

            <div className="col-12">
              <button type="submit" className='button primary'>Login</button>
            </div>

          </div>

        </form>

      </div>

    </div>

  )

}