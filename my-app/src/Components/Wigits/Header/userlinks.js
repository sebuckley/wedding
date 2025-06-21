import React from 'react';

export default function UserLinks(props){

    return(

        <nav className="userLinks">

        <a className="menuActive" href="/managemywedding">Dashboard</a>
        <a className="menuActive" href="/">Webpage</a>
        <a className="menuActive" href="/managemywedding/details">Details</a>
        <a className="menuActive" href="/managemywedding/guests">Guest List</a>
        <a className="menuActive" href="/managemywedding/tasks">Task List</a>
        <a className="menuActive" href="/" onClick={(e) => props.logOut() }>Log Out</a>

    </nav>

    )

}