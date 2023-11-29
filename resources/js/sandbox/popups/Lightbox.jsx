import React from 'react';
import Draggable from 'react-draggable';
import closeButton from '../../../images/close.png';
import './Lightbox.css';
import usePopups from './Popups';

// This function takes the data.Body from Lightbox and returns a string or a
// react component so that showLightbox's 2nd argument can be anything.
function LightboxBody({ Body, actions }) {
	if (typeof Body === 'function') return <Body popup={{ close: actions.close }} />;
	return <div>{ Body }</div>;
}


export default function Lightbox({ data, children, icon = null }) {
	const { closeLightbox } = usePopups();
	const close = () => {
		closeLightbox(data.id);
	};

	icon = icon || {
		image: closeButton,
		action: close
	};

	return (
		<div className='lightbox-wrapper' id={data.id}>
			<div className="shadowbox"></div>
			<Draggable handle=".lightbox-title" defaultPosition={{ x: '-50px', y: '-50px' }}>
				<div 
					className="lightbox" 
					onClick={(e) => e.stopPropagation()}
				>
					<div className="lightbox-header">
						<div className='lightbox-title'>
							<h2>{data.title}</h2>
						</div>
						<button className='closeButton' onClick={icon.action}>
							<img src={icon.image} alt="Close Popup" />
						</button>
					</div>
				
					<div className='lightbox-content'>
						<LightboxBody Body={data.Body || children} actions={{ close }} />
					</div>
				</div>
			</Draggable>
		</div>
	);
}

