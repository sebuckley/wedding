import React from 'react';
import { Link } from 'react-router-dom';

export default function UserLinks(props){

    return(

        <nav className="userLinks">

            <Link className="menuActive" to="/managemywedding">Dashboard</Link>
            <Link className="menuActive" to="/">Webpage</Link>
            <Link className="menuActive" to="/managemywedding/details">Details</Link>
            <Link className="menuActive" to="/managemywedding/guests">Guest List</Link>
            <Link className="menuActive" to="/managemywedding/tasks">Task List</Link>
            <Link className="menuActive" to="/managemywedding/suppliers">Suppliers</Link>
            <Link className="menuActive" to="/" onClick={(e) => props.logOut() }>Log Out</Link>

        </nav>

    )

}