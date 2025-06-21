
    import React from 'react';
    import "./privacy-policy.css";
    import Header from '../Header/header';
    
    export default function PrivacyPolicy(props){

        const headerOn = props.headerOn;
        const bridalParty = props.bridalParty;

    return (
    
        <div>

            < Header location="privacy-policy" fName={bridalParty.groom.fName} sName={bridalParty.bride.fName} headerOn={ headerOn }/>

            <div id="body">

            <section id='policy-title'>
                <h1>Privacy Policy</h1>
                <p><strong>Effective Date:</strong> [Insert Date]</p>
            </section>
            
            <section id="introduction">
                <p>At <strong>[Your Company Name]</strong>, we value your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you interact with our services.</p>
            </section>
            
            <section id="information-we-collect">
                <h2>1. Information We Collect</h2>
                <ul>
                    <li><strong>Personal Information:</strong> Name, email address, phone number, billing address, etc.</li>
                    <li><strong>Usage Data:</strong> IP address, browser type, device information, and pages viewed.</li>
                    <li><strong>Cookies and Tracking Technologies:</strong> Information to improve user experience and analyze website traffic.</li>
                </ul>
            </section>
            
            <section id="how-we-use">
                <h2>2. How We Use Your Information</h2>
                <p>We use your information for the following purposes:</p>
                <ul>
                    <li>To provide and improve our services.</li>
                    <li>To communicate with you about updates or promotions.</li>
                    <li>To ensure security and prevent fraud.</li>
                    <li>To comply with legal obligations.</li>
                </ul>
            </section>
            
            <section id="sharing-your-info">
                <h2>3. Sharing Your Information</h2>
                <p>We may share your information with:</p>
                <ul>
                    <li><strong>Service Providers:</strong> Third-party vendors who perform services on our behalf.</li>
                    <li><strong>Legal Authorities:</strong> When required by law or to protect our rights.</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets.</li>
                </ul>
            </section>
            
            <section id="your-rights">
                <h2>4. Your Rights</h2>
                <p>You may have rights under data protection laws, such as:</p>
                <ul>
                    <li>Accessing your personal information.</li>
                    <li>Requesting corrections or deletions.</li>
                    <li>Opting out of certain data processing activities.</li>
                </ul>
            </section>
            
            <section id="cookies">
                <h2>5. Cookies and Tracking</h2>
                <p>We use cookies to enhance your experience. You can manage your preferences through your browser or our Cookie Consent Banner.</p>
            </section>
            
            <section id="security">
                <h2>6. Security</h2>
                <p>We implement appropriate measures to protect your data from unauthorized access, disclosure, or destruction.</p>
            </section>
            
            <section id="contact-us">
                <h2>7. Contact Us</h2>
                <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
                <address>
                    <p><strong>Email:</strong> [Insert Email Address]</p>
                    <p><strong>Phone:</strong> [Insert Phone Number]</p>
                    <p><strong>Address:</strong> [Insert Address]</p>
                </address>
            </section>

            </div>

        </div>

    )

    }