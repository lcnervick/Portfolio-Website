import React from 'react';
import '../../css/pages/Contact.css';
import ContactForm from '../components/ContactForm';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function Contact(props) {
	document.title = props.title || 'Leif Nervick | Web Developer';

	return (
		<section className='contact-container'>
		<div className='contact-content'>
			<aside className='contact-main-section'>
				<h1>I'd Love to Hear From You!</h1>
				<div className="contact-info">
					<p><span className="material-icons">phone</span> <a href="tel:3039122225">(720) 912-5225</a></p>
					<p><span className="material-icons">email</span> <a href="mailto: leif@synapticsoftware.net">leif@synapticsoftware.net</a></p>
					<p> <span className="material-icons fa-brands fa-linkedin"></span> <a href="https://linkedIn.com/in/leif-nervick" target="_blank">LinkedIn Profile</a></p>
				</div>

			</aside>
			<aside className='contact-form-section'>
				<h2>Please fill out all required fields</h2>
				<GoogleReCaptchaProvider
					reCaptchaKey='6LetBhQpAAAAAD9x-7JtRl8gfmi-TLsBfkyVM5mm'
					scriptProps={{
						defer: true,
						appendTo: 'head'
					}}
					container={{
						element: 'recaptcha',
						parameters: {
							badge: 'inline'
						}
					}}
				>
					<ContactForm />
				</GoogleReCaptchaProvider>
			</aside>
		</div>
	</section>

	);
}
