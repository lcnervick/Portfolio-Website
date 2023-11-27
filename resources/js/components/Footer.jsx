import React from 'react';
import { routes } from '../router/router';
import { Link, NavLink } from 'react-router-dom';

import '../../css/components/Footer.css';
import '../../css/components/Navigation.css';
import Logo from './Logo';
import ContactForm from './ContactForm';

export default function Footer() {
	return (
		<footer>
			<Logo type="footer" />
			<div className="footer-content">
				{/* <section className="footer-quick-links">
					<h4>Quick Links</h4>
					<ul>
						<li><Link to="/sign-up">Sign Me Up!</Link></li>

						<li><Link to="/login">Member Login</Link></li>

						<li><Link to="/privacy-terms">Privacy / Terms</Link></li>
					</ul>
				</section> */}
	
				<section className='footer-contact-info'>
					<h4>Contact Info</h4>
					<ul>
						<li>
						<Link to="tel:7209125225">
							<svg aria-hidden="true" focusable="false" className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
								<path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"/>
							</svg>
							(720) 912-5225
						</Link>
						</li>

						<li>
						<Link to="mailto:leif@synapticsoftware.net">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon">
								<path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
							</svg>
							leif@synapticsoftware.net
						</Link>
						</li>

						<li>
						<Link to="https://linkedIn.com/in/leif-nervick">
							<span className="material-icons fa-brands fa-linkedin" style={{color: 'var(--theme-light)', verticalAlign: 'baseline'}}></span>	LinkedIn Profile
						</Link>
						</li>

						<li>
						<Link to="https://github.com/lcnervick">
							<span className="material-icons fa-brands fa-github" style={{color: 'var(--theme-light)', verticalAlign: 'baseline'}}></span> GitHub Repository
						</Link>	
						</li>
					</ul>
				</section>

				<section>
					<h4>Sitemap</h4>
					<nav className='footer-navigation'>
						<ul>{
							Object.keys(routes).map(r => (routes[r].menuItem
								? <li key={routes[r].name}><NavLink to={routes[r].path}>{routes[r].name}</NavLink></li>
								: null
							))
						}</ul>
					</nav>
				</section>
			</div>
			<p style={{textAlign: 'center', fontSize: 'bold', padding: '0.5rem', width: '100%'}}>&copy; 2023 Synaptic Software</p>
		</footer>
	)
}
