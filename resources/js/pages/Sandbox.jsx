import React, { useState } from 'react';
import '../../css/pages/Sandbox.css';
import IdleTimer from '../sandbox/idleTimer/idleTimer';
import usePleaseWait from '../contexts/PleaseWait';
import InfoSlider from '../sandbox/idleTimer/InfoSlider/InfoSlider';

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
	const { waiting, isWaiting, text, setText } = usePleaseWait({text:'Check This Out'})
	const tryPleaseWait = (e) => {
		waiting(true);
		setTimeout(() => {
			waiting(false);
		}, pleaseWaitTimeout * 1000);
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
		</div>
	</div>)
}
