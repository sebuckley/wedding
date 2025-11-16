import './Header.css'; 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../PublicSite/Components/Logo/logo';
import MobileMenu from './mobileMenu';
import PublicLinks from './publiclinks';
import UserLinks from './userlinks';
import useToken from '../../App/useToken';
import { signOut } from 'firebase/auth';
import { auth } from '../../Login/firebaseConfig';

export default function Header(props){

    const [mobileSet, setMobileState] = useState(0);
    const [menuState, setMenuState] = useState(0);
    const [activeSection, setActiveSection] = useState('');
    const [webPage, setWebpage] = useState(0);
    const { token, setToken } = useToken();
    const user = props.user;
    const setLoggedIn = props.setLoggedIn;
    const loggedIn = props.loggedIn;
    let logInPage = props.logInPage
    let publicPage = props.publicPage;
    const weddingDateSet = props.weddingDateSet;
    const weddingVenueSet = props.weddingVenueSet;
    const weddingFAQSet = props.weddingFAQSet;

    if(typeof logInPage === "undefined"){

        logInPage = false;

    }

    if(typeof publicPage === "undefined"){

        publicPage = false;

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

    const handleLogout = async () => {

        try {

            await signOut(auth);
            setLoggedIn(false);

        } catch (error) {

            console.error('Logout error:', error);

        }
    };

    const setPage = () => {

        let locationIs = window.location.href.includes("managemywedding");

        if(locationIs){

            setWebpage(1);

        } else {

            setWebpage(0);

        }

    }

    const getLogInPage = () => {

        let object = "";

        if(!logInPage && publicPage === true){

            object = <PublicLinks  activeSection={ activeSection } token={ token } webPage={ webPage } onClickPage={ setPage } user={ user } loggedIn={ loggedIn } setLoggedIn={ setLoggedIn } handleLogout={ handleLogout } weddingDateSet={ weddingDateSet } weddingVenueSet={ weddingVenueSet } weddingFAQSet={ weddingFAQSet }/>

        }

        return object;

    }

    return(

        <div className="header">

                { mobileSet ? <MobileMenu showMenu={ showMenu }  menuState={ menuState } /> : ""}
        
                <div className="headerLogo">

                    <Link to="/"><Logo fName={props.firstName} sName={ props.sName }/></Link>
                
                </div>
                
                <div className="headerLinks">
                
                    <div className="linksGroup">

                        { loggedIn ? getLogInPage() : getLogInPage() }

                        { loggedIn && publicPage === false ? <UserLinks token={ token } setToken={ setToken } logOut={ handleLogout } onClick={ setPage } loggedIn={ loggedIn } setLoggedIn={ setLoggedIn }/> : "" }

                    </div>

                </div>

        </div>

    )
}



