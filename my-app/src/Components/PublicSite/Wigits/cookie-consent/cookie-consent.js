import React from "react";
import './cookie-consent.css';

export default function CookieConsent(props){

    let value = localStorage.getItem('Privacy-Policy');

    const setAccept = () => {

        localStorage.setItem('Privacy-Policy', 1);
        document.getElementById("banner").style.display = "none";

    }

    const setReject = () => {

        localStorage.setItem('Privacy-Policy', 0);
        window.location.replace("http://www.google.co.uk");

    }

    const displayCookie = () => {

        return(

            <div id="banner">

                <div className="text">
                    <p>We use cookies to enhance your browsing experience, analyze traffic, and tailor content to your interests. By clicking 'Accept,' you consent to our use of cookies. You can learn more in our <a className='privacy-policy' href='./privacy-policy'>privacy policy</a>. </p>           
                </div>
                <div className="buttons">
                    <button onClick={ setAccept }>Accept</button>
                    <button onClick={ setReject }>Reject</button>
                    {/* <button>Manage Preferences</button> 'or by managing your preferences - add this text back into the text above when reinstating' */}
                </div>

            </div>

        )


    }

    return(

     !value || value !== "1" ? displayCookie() : ""
        
    )

}