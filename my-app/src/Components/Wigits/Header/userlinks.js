import React from 'react';
import { Link } from 'react-router-dom';

export default function UserLinks(props){

    return(

        <nav className="userLinks">

            <Link to="/managemywedding">Dashboard</Link>
            <Link to="/">Webpage</Link>
            <Link to="/managemywedding/details">Details</Link>
            <Link to="/managemywedding/guests">Guest List</Link>
            <Link to="/managemywedding/tasks">Task List</Link>
            <Link to="/managemywedding/suppliers">Suppliers</Link>
            <Link to="/" onClick={(e) => props.logOut() }>Log Out</Link>

        </nav>

    )

}