import React, { useState } from 'react';
import Navigation from './Navigation';
import MenuButton from './MenuButton';
import Logo from './Logo';

import '../../css/components/Header.css';
import LightDarkModeSwitch from '../contexts/LightDarkMode';

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header>
			<Logo type="header" />
			<LightDarkModeSwitch />
			<MenuButton open={menuOpen} setMenuOpen={setMenuOpen} />
			<Navigation open={menuOpen} setMenuOpen={setMenuOpen}/>
		</header>
	)
}
