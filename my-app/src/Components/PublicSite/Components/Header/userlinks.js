import React from 'react';

export default function UserLinks(props){

    const setToken = props.setToken;
    
    let logOut = () => {

        localStorage.removeItem('token');
        setToken(false);
    
    }

    const checkHref = () => {

        let locationIs = window.location.href.includes("managemyweeding");
       
            return locationIs;

    }

    const currentLocation = checkHref();

    return(

        <nav className="userLinks">

            { currentLocation ? "List item": "" }

            <a className="menuActive" href="/managemywedding">Dashboard</a>
            <a className="menuActive" href="/">Webpage</a>
            <a className="menuActive" href="/managemywedding/details">Details</a>
            <a className="menuActive" href="/managemywedding/tasks">Task List</a>
            <a className="menuActive" href="/" onClick={(e) => logOut()}>Log Out</a>

        </nav>

    )

}