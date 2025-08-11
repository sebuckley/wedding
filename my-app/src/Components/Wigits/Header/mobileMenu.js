
import React from 'react';

export default function MobileMenu(props){

    const menuIcon = {

        "backgroundImage": "url(/images/menu.png)",
        "height": "39px",
        "width": "39px",
        "backgroundSize": "cover",
        "backgroundRepeat": "no-repeat",
        "zIndex": "11",
        "display": "block",
        "cursor": "pointer",
        "margin": "5px",

    }

    const closeMenuIcon = {

        "backgroundImage": "url(/images/menuClose.png)",
        "height": "39px",
        "width": "39px",
        "backgroundSize": "cover",
        "backgroundRepeat": "no-repeat",
        "zIndex": "11",
        "display": "block",
        "cursor": "pointer",
        "margin": "5px",

    }


    return(

        <div className="menuIcon" onClick={ props.showMenu } style={ props.menuState ? menuIcon: closeMenuIcon }></div>

    )

}