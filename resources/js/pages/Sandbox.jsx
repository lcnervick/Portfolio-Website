import React, { useState } from 'react';
import '../../css/pages/Sandbox.css';
import IdleTimer from '../sandbox/idleTimer/idleTimer';
import usePleaseWait from '../contexts/PleaseWait';
import InfoSlider from '../sandbox/InfoSlider/InfoSlider';
import usePopups from '../sandbox/popups/Popups';

export default function Sandbox() {
	// Idle Timer States
	const [idleTimerActive, setIdleTimerActive] = useState(false);
	const [idleTimerTimeout, setIdleTimerTimeout] = useState(20);
	const [idleTimerWarning, setIdleTimerWarning] = useState(5);
	const handleIdleTimerActive = (e) => setIdleTimerActive(e.target.checked);
	const handleIdleTimerTimeout = (e) => {
		if (parseInt(e.target.value) > idleTimerWarning) setIdleTimerTimeout(parseInt(e.target.value));
	}
	const handleIdleTimerWarning = (e) => {
		if (parseInt(e.target.value) < idleTimerTimeout) setIdleTimerWarning(e.target.value);
	}

	// Please Wait States
	const [pleaseWaitTimeout, setPleaseWaitTimeout] = useState(3);
	const { waiting, isWaiting, text, setText } = usePleaseWait()
	const tryPleaseWait = (e) => {
		waiting(true);
		setTimeout(() => {
			waiting(false);
		}, pleaseWaitTimeout * 1000);
	}

	// POPUPS PROVIDER
	const popups = usePopups();
	const LightboxBody = () => {
		return (<>
			<p>You can call this function with a title and any kind of body you want. For example:<br /><br /></p>
			<ul>
				<li>This is actually a react functional component that was passed to the function.</li>
				<li>You can pass in text too, but to help avoid XSS attacks, no html is allowed.</li>
			</ul>
		</>)
	}
	const AlertBody = () => {
		return (<>
			<p>The alert boxes are good for information the user needs to see and/or agree to. There are 4 different styles:<br /><br /></p>
			<ul>
				<li>Success - for telling the user something worked.</li>
				<li>Warn - to warn the user about something.</li>
				<li>Fail - to let the user know something didn't work (which never happens, lol).</li>
				<li>Info - to display information to the user.</li>
			</ul>
		</>)
	}
	const ConfirmBody = () => {
		return (<>
			<p>The confirmation popups are good for getting user input one direction or the other. The function returns a promise with the callback set to true for YES or false for NO.<br /><br /></p>
		</>)
	}

	return (<div className='sandbox-container'>
		<h1>My Sandbox</h1>
		<p>This is my own personal playground where I can try new cool things and show them off at the same time! Feel free to try out anything here. Push buttons and see what happens!</p>
		<hr style={{margin: '1rem auto', borderColor: 'var(--theme-green)'}} />

		<div className='sandbox-apps'>
			<div id="idleTimer">
				<h2>Idle Timer</h2>
				<p>This is a simple little idle timer typically used to automatically log a user out after a certain amount of time. Set the timeout and warning numbers, then check the active checkbox to try it out.</p>
				<table>
					<tbody>
					<tr>
						<td><label htmlFor="idleTimer-active">Idle Timer Active</label></td>
						<td><input id="idleTimer-active" type="checkbox" checked={idleTimerActive} onChange={handleIdleTimerActive} /></td>
					</tr>
					<tr>
						<td><label htmlFor="idleTimer-timeout">Time Before Idle (s)</label></td>
						<td><input id="idleTimer-timeout" type="number" value={idleTimerTimeout} onChange={handleIdleTimerTimeout} /></td>
					</tr>
					<tr>
						<td><label htmlFor="idleTimer-warning">Warning Duration (s)</label></td>
						<td><input id="idleTimer-warning" type="number" value={idleTimerWarning} onChange={handleIdleTimerWarning} /></td>
					</tr>
					</tbody>
				</table>
				<IdleTimer active={idleTimerActive} timeout={idleTimerTimeout} promptBeforeIdle={idleTimerWarning} />
			</div>

			<div id="pleaseWait">
				<h2>Please Wait</h2>
				<p>This is a simple "spash-screen" component used to overlay the screen while data is loading. It was created as a React Context Provider, so it can be utilized with a 'usePleaseWait' hook and calling 'waiting(bool)' to activate and deactivate it. You can customize it with custom text and images on each instantiation. To try it out, just set the timer length and custom text and press the 'try it' button.</p>
				<div className='please-wait-controls'>
					<table>
						<tbody>
						<tr>
							<td><label htmlFor="pleaseWait-timeout">Display Time (s)</label></td>
							<td><input id="pleaseWait-timeout" type="number" value={pleaseWaitTimeout} onChange={(e) => setPleaseWaitTimeout(e.target.value)} /></td>
						</tr>
						<tr>
							<td><label htmlFor="idleTimer-timeout">Custom Text</label></td>
							<td><input id="idleTimer-timeout" type="text" value={text} onChange={(e) => setText(e.target.value)} /></td>
						</tr>
						</tbody>
					</table>
					<button className="button light-button" onClick={tryPleaseWait}>Try It!</button>
				</div>
			</div>

			<div id="infoSlider">
				<h2>Info Slider</h2>
				<p>This component takes a simple JSON object and renders a nice-looking animated slider and info box. The button can be programmed to do anything pretty easily based on the selected 'page'.</p>
				<InfoSlider />
			</div>

			<div id="popupProvider">
				<h2>Popup Provider</h2>
				<p>This is a very handy tool designed for React.js that allows you to popup modals using a provider and hook. There are regular 'lightbox' style modals, alert popups and confirmation popups.</p>
				<div className='button-container'>
					<button class="button" onClick={(e) => popups.showLightbox('Sample Lightbox', <LightboxBody />)}>Try the Lightbox</button>
					<button class="button confirm-button" onClick={(e) => 
						popups.showConfirm('Let Me Ask You Something', <ConfirmBody />).then((response) => {
							popups.showAlert(response ? 'success': 'fail', (response ? 'Yesssss!' : 'Really?!?'), 'You selected the ' + (response ? 'YES' : 'NO') + ' button!')
						})
					}>Ask Me Something</button>
				</div>
				<hr />
				<div className='button-container'>
					<button class="button alert-button" onClick={(e) => popups.showAlert('success', 'It Worked!', <AlertBody />)}>Success Alert</button>
					<button class="button alert-button" onClick={(e) => popups.showAlert('warn', 'Something Will Happen', <AlertBody />)}>Warning Alert</button>
					<button class="button alert-button" onClick={(e) => popups.showAlert('fail', 'That Didn\'t Work', <AlertBody />)}>Failure Alert</button>
					<button class="button alert-button" onClick={(e) => popups.showAlert('info', 'Something You Should Know', <AlertBody />)}>Info Alert</button>
				</div>
				<hr />
			</div>
		</div>
	</div>)
}
