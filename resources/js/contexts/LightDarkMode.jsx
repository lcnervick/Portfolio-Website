import { useState, useMemo, useContext, createContext, useEffect } from 'react';
import Switch from "react-switch";
import '../../css/components/LightDarkMode.css';

const LightDarkModeContext = createContext({
	lightMode: false,
});

export function useLightDarkMode() {
	return useContext(LightDarkModeContext);
}


export default function LightDarkModeSwitch() {
	const {lightMode, toggleLightMode} = useLightDarkMode();
	console.log('lightMode', lightMode);

	return (
		<label id="lightDarkModeButton">
			<span>{!lightMode ? 'Light' : 'Dark'}<br />Mode</span>
			<Switch
				onChange={toggleLightMode}
				checked={lightMode}
				onColor={'#249db3'}
			/>
		</label>
	)
}

export function LightDarkModeProvider({children}) {
	const [lightMode, setLightMode] = useState(false);
	
	const toggleLightMode = () => {
		setLightMode(!lightMode);
	}

	useEffect(() => {
		document.documentElement.style.setProperty('--theme-dark', lightMode ? 'hsl(0, 0%, 90%)' : 'hsl(0, 0%, 10%)');
		document.documentElement.style.setProperty('--theme-light', lightMode ? 'hsl(0, 0%, 10%)' : 'hsl(0, 0%, 90%)');
		document.documentElement.style.setProperty('--theme-yellow', lightMode ? 'hsl(313, 45%, 45%)' : 'hsl(61, 96%, 74%)');
		document.documentElement.style.setProperty('--theme-dark-trans', lightMode ? 'hsla(0, 0%, 90%, 0.9)' : 'hsl(0, 0%, 10%, 0.9)');
		document.documentElement.style.setProperty('--theme-light-trans', lightMode ? 'hsla(0, 0%, 10%, 0.9)' : 'hsl(0, 0%, 90%, 0.9)');
		for(const img of document.querySelectorAll('img')) {
			if(img.src.match(lightMode ? /-dark/ : /-light/)) {
			console.log(img.src);
			img.src = img.src.replace(lightMode ? /-dark/ : /-light/, lightMode ? "-light" : "-dark");
			}
		}
		document.getElementById('app').className = lightMode ? 'lightMode' : 'darkMode';
	}, [lightMode]);

	const providerValues = useMemo(() => ({
		lightMode,
		setLightMode,
		toggleLightMode,
	}), [lightMode]);

	return (
		<LightDarkModeContext.Provider value={providerValues}>
			{children}
		</LightDarkModeContext.Provider>
	);
}
