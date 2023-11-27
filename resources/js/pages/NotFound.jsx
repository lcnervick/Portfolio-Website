import React from 'react';
import image404 from '../../images/404.png';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { ScrollRestoration } from 'react-router-dom';
import '../../css/pages/NotFound.css';

export default function NotFound() {
	document.title = 'Not Found | Leif Nervick';

	return (<>
		<Header />
		<main>
			<div className="not-found">
				<h1>404 - Not Found</h1>
				<div className='not-found-image'><img src={image404} alt="404 Page Not Found" /></div>
				<div className='not-found-content'>
					<h2>Oh, No! A Dog Has Eaten This Page!</h2>
					<p>While he really is a good dog, sometimes things just look too tasty to pass up... like this page.<br />If only you had seen it before the dog ate it. It was truly a masterpiece!</p>
					<button
						className='button'
						onClick={() => window.history.back()}
					>Go Back</button>
				</div>
			</div>
		</main>
		<Footer />
		<BackToTop />
		<ScrollRestoration />
	</>);
}
