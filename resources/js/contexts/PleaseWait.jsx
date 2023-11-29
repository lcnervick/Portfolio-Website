import { useState, useMemo, useContext, createContext } from 'react';
import pleaseWaitImage from '../../images/please-wait.gif';
import '../../css/components/PleaseWait.css';

const PleaseWaitContext = createContext({
	waiting: () => {},
	isWaiting: false,
	text: 'Loading... Please Wait',
	setText: () => {},
	image: pleaseWaitImage,
	setImage: () => {}
});


export function PleaseWait({visible}) {
	const pleaseWaitContext = useContext(PleaseWaitContext);

	return (visible ? <>
		<div className="please-wait-shadowbox">
			<div className='please-wait-container'>
				<img className="please-wait-image" src={pleaseWaitContext.image} alt="please wait" />
				<div className='please-wait-text'>{pleaseWaitContext.text}</div>
			</div>
		</div>
	</> : '');
}

export function PleaseWaitProvider({children}) {
	const [isLoading, setIsLoading] = useState(false);
	const [text, setText] = useState('Loading... Please Wait');
	const [image, setImage] = useState(pleaseWaitImage);
	
	const waiting = (status) => {
		setIsLoading(!!status)
	}

	const providerValues = useMemo(() => ({
		waiting,
		isWaiting: !!isLoading,
		text,
		setText,
		image,
		setImage
	}), [waiting, text, image]);
		
	return (
		<PleaseWaitContext.Provider value={providerValues}>
			{children}
			<PleaseWait visible={isLoading}  />
		</PleaseWaitContext.Provider>
	);
}

export default function usePleaseWait(props) {
	const context = useContext(PleaseWaitContext);
	if (typeof props !== 'object') props = {};
	const defaults = {
		text: context.text,
		image: context.image
	};
	const opts = {...defaults, ...props}

	console.log('context', context)
	context.setText(opts.text);
	context.setImage(opts.image);
	return context;
}
