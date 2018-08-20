import React from 'react';

import './Contact.css';
import SimpleMap from '../../Containers/Maps/SimpleMap';

const contact = () => {
    return (
        <div className="Contact">
            {/* <h3>Contact at NCJ.com </h3> */}
            <div className="ContactForm">
                <form method="POST" action="https://formspree.io/choudharysharan1@gmail.com">
                    <h3>Contact Us Form</h3>
                    <input type="email" name="email" placeholder="Your email" required/>
                    <textarea name="message" placeholder="Your message" required></textarea>
                    <button type="submit">Send</button>
                </form>  
            </div>
            <SimpleMap />
        </div>
    );
}

export default contact;