import React, { useEffect, useRef, useState } from 'react';
import AnimatedElement from '../../../components/AnimatedElement';
import parse from 'html-react-parser';

import './InfoSlider.css';

const data = [
	{
		id: 1,
		name: 'Monthly',
		desc: 'Monthly Plan',
		rate: 45,
		freq: '/Per Month',
		url: '',
		details: [
			'Our most flexible plan',
			'Cancel any time. No questions',
			'Includes all features',
		]
	},
	{
		id: 2,
		name: 'Quarterly',
		desc: 'Quarterly Plan',
		rate: 120,
		freq: '/3 Months',
		url: '',
		details: [
			'Save 12%',
			'Easy Auto-Pay Options',
			'Only pay every 3 months',
		]
	},
	{
		id: 3,
		name: 'Annual',
		desc: 'Annual Plan',
		rate: 400,
		freq: '/Per Year',
		url: '',
		details: [
			'Save 26% (vs monthly plan)',
			'Pay once for a full year of unlimited access',
			'Includes all features',
		]
	}
];

export default function InfoSlider() {
	const [info, setInfo] = useState(data[0]);
	const listRef = useRef(null);

	const changeInfo = (r) => {
		const n = data.findIndex(i => i.name === r);
		// Move the selector to the right spot;
		listRef.current.style.setProperty('--info-type-pos', (n * (100 / data.length)) + '%');
		setTimeout(() => {
			// set the name after it has traveled half-way there
			listRef.current.style.setProperty('--info-type-name', `'${r}'`);
			setInfo(data[n]);
		}, 150);
	};

	useEffect(() => {
		changeInfo(data[0].name);
	}, []);

	const handleButton = (e) => {
		e.preventDefault();
	}

	return (<div className='info-slider'>
		<ul className='info-chooser' ref={listRef}>
			{data.map((r,i) => (
				<li
					key={r.name}
					className={info.name === r.name ? 'selected-info' : ''}
					onClick={(e) => {changeInfo(r.name)}}
				>{r.name}
				</li>
			))}
		</ul>
		<div className="info-container">
		{
			data.map(d => (
				<div className={'info-card' + (info.name === d.name ? ' visible-info' : '')}>
					<h3>{info.desc}</h3>
					<h4><span style={{verticalAlign:'top'}}>$</span><span className='info-container-price'>{info.rate}</span>{info.freq}</h4>
					<hr />
					<ul className='info-container-details'>
						{ info.details.map(r => <li key={r}>{parse(r)}</li>) }
					</ul>
					<AnimatedElement animate="zoom">
						<button
							className='button dark-button inverted info-card-button'
							onClick={handleButton}
						>Sign-Up</button>
					</AnimatedElement>
				</div>
			))
		}
		</div>
	</div>);
}
