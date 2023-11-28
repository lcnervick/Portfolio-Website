import React, { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import '../../sandbox/idleTimer/idleTimer.css';
import axios from 'axios';


export default function IdleTimer({active, timeout, promptBeforeIdle}) {
	const [promptActive, setPromptActive] = useState(false);
	const [remaining, setRemaining] = useState(0);

	const onPrompt = () => {
		// Fire a Modal Prompt
		setPromptActive(true);
	}

	const onIdle = () => {
		// Close Modal Prompt
		setPromptActive(false);
		// Do some idle action like log out your user
		// axios.post('/logout').finally(response => {
			window.location.href='/';
		// });
	}

	const onAction = (event) => {
		if (active && promptActive) {
			setPromptActive(false);
			activate();
		}
	}

	const {
		reset,
		pause,
		activate,
		getRemainingTime,
	} = useIdleTimer({
		onPrompt,
		onIdle,
		onAction,
		timeout: 1000 * timeout,
		promptBeforeIdle: 1000 * promptBeforeIdle,
		stopOnIdle: false,
	});

	useEffect(() => {
		if (active) {
			reset();
			activate();
		} else {
			pause();
		}
	}, [active])

	useEffect(() => {
		const interval = setInterval(() => {
			setRemaining(Math.ceil(getRemainingTime() / 1000));
		}, 500);

		// if the timer has been running for one minute.
		if(remaining === (60 * (timeout-60))) {
			// axios.get('/session');
		}

		return () => {
			clearInterval(interval);
		}
	});

	return (promptActive
		?	(<div className="idle-timer">
				<div className='idle-timer-prompt'>
					<h3>Inactivity Warning</h3>
					Are you still there?<br />You will be automatically logged out if you remain inactive for {Math.ceil(getRemainingTime()/1000)} more seconds...</div>
			</div>)
		:	null
	);
}

