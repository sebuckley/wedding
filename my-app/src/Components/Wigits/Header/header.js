import './Header.css'; 
import React, { useState, useEffect } from 'react';
import Logo from '../../PublicSite/Components/Logo/logo';
import MobileMenu from './mobileMenu';
import PublicLinks from './publiclinks';
import UserLinks from './userlinks';
import useToken from '../../App/useToken'

export default function Header(props){

    const [mobileSet, setMobileState] = useState(0);
    const [menuState, setMenuState] = useState(0);
    const [activeSection, setActiveSection] = useState('');
    const [webPage, setWebpage] = useState(0);
    const { token, setToken } = useToken();
    const displayPublic = props.displayPublic;

    const logoCanvasStyle = {

        "position": "relative",
        "height": "50px",
        "width": "80px",

    }

    const fNameStyle = {

        "position": "absolute",
        "top": "-1px",
        "left": "-3px",
        "fontFamily": "'Over the Rainbow', cursive",
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontSize": "15px",
        "zIndex": "2",

    }

    const sNameStyle = {

        "position": "absolute",
        "bottom": "-1px",
        "left": "17px",
        "fontFamily": "'Over the Rainbow', cursive",
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontSize": "15px",
        "zIndex": "2",

    }

    const andStyle = {

        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "transform": "translate(-50%, -50%)",
        "fontFamily": "'Anton', sans-serif",
        "fontWeight": "400",
        "fontStyle": "normal",
        "fontSize": "50px",
        "color": "rgb(185, 185, 185)",
        "zIndex": "1",
        "opacity": "0.6",


    }

    let onClickMenuItem = (e) => {

        let links = document.getElementsByClassName("menuActive");

        for(let i = 0; i < links.length; i ++){

            links[i].classList.remove("active");

        }

        const elementID = e.target.innerHTML;

        setActiveSection(elementID);

        if(elementID !== "Countdown"){
       
            setTimeout(function () {

                let windowPosition = window.scrollY - 100;

                window.scrollTo(0,windowPosition);

            },2);

        }

    }

    const showMenu = (e) => {
 
        let hiddenElement = document.getElementsByClassName("headerLinks");

        if (hiddenElement[0].style.display === "block"){

            hiddenElement[0].style.display = "none"; 
            setMenuState(1);

           
        }else{

            hiddenElement[0].style.display = "block";
            setMenuState(0);

        }

    }

    useEffect(() => {

		const handleResize = () => {

            let hiddenElement = document.getElementsByClassName("headerLinks");

            if(window.innerWidth <= 700){
    
                hiddenElement[0].style.display = "none";
                setMobileState(1);
                setMenuState(1);
    
            }else{

                
                hiddenElement[0].style.display = "block";
                setMobileState(0);
                setMenuState(0);

            }

		};

		window.addEventListener('resize', handleResize);

        return () => {

			window.removeEventListener('resize', handleResize);

		};

	}, []);

    useEffect(() => {

        const handleScroll = () => {

            const sections = document.querySelectorAll('section');
            let currentSection = '';
        
            sections.forEach(section => {

                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) {
                    // you're at the bottom of the page

                    currentSection = "Countdown";

                }else{

                    if (window.scrollY >= sectionTop - sectionHeight / 3) {

                        currentSection = section.getAttribute('id');
    
                    }

                }               

            });
        
             setActiveSection(currentSection);

            };

                window.addEventListener('scroll', handleScroll);
        
            return () => {

                window.removeEventListener('scroll', handleScroll);
            
            };

      }, []);

    let logOut = () => {

        localStorage.removeItem('token');
        setToken(false);
    
    }

    const setPage = () => {

        let locationIs = window.location.href.includes("managemywedding");

        if(locationIs){

            setWebpage(1);

        } else {

            setWebpage(0);

        }

    }

    return(

        <div className="header">

                { mobileSet ? <MobileMenu showMenu={ showMenu }  menuState={ menuState } /> : ""}
        
                <div className="headerLogo">

                    <a href="/" className="logo"><Logo canvasStyle={logoCanvasStyle} fName={props.fName} sName={props.sName} fNameStyle={fNameStyle} sNameStyle={sNameStyle} andStyle={andStyle}/></a>
                
                </div>
                
                <div className="headerLinks">
                
                    <div className="linksGroup">

                        { displayPublic ? <PublicLinks onClickMenuItem={ onClickMenuItem } activeSection={ activeSection } token={ token } webPage={ webPage } logOut={ logOut } onClickPage={ setPage }/> : "" }

                        { displayPublic ? "" : <UserLinks token={ token } setToken={ setToken } logOut={ logOut } onClick={ setPage }/> }

                    </div>

                </div>

        </div>

    )
}



