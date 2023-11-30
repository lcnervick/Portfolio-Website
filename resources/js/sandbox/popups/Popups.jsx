import React, { useMemo, useState, createContext, useContext } from "react";
import { v4 as uuid } from "uuid";
import Lightbox from "./Lightbox";
import Alert from "./Alert";
import Confirm from "./Confirm";

export const PopupContext = createContext();
export default function usePopups() {
	return useContext(PopupContext);
};

export const PopupProvider = ({ children }) => {
    const [lightboxes, setLightboxes] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [confirms, setConfirms] = useState([]);
	
	const showLightbox = (title, Body) => {
		setLightboxes(prevLightboxes => [
			...prevLightboxes,
			{
				id: uuid(),
				title,
				Body
			}
		]);
	};

	const closeLightbox = (id) => {
		setLightboxes(prev => prev.filter(e => e.id !== id));
	};

	const showAlert = (type, title, Message) => {
		// console.log("Showing Alert", type, title, Message);
		return new Promise((resolve) => {
			setAlerts(prevAlerts => [
				...prevAlerts,
				{
					id: uuid(),
					type,
					title,
					Message,
					callback: resolve
				}
			]);
		});
	};

	const closeAlert = (id) => {
		setAlerts(prev => prev.filter(e => e.id !== id));
	};

	const showConfirm = (title, Message) => {
		// console.log("Showing Confirm", title, Message);
		return new Promise((resolve) => {
			setConfirms(prevConfirms => [
				...prevConfirms,
				{
					id: uuid(),
					title,
					Message,
					callback: resolve
				}
			]);
		});
	};

	const closeConfirm = (id) => {
		setConfirms(prev => prev.filter(e => e.id !== id));
	};

	const popupProviderProps = useMemo(() => ({ 
		showLightbox,
		closeLightbox,
		showAlert,
		closeAlert,
		showConfirm,
		closeConfirm
	}), []);

	return (
		<PopupContext.Provider value={popupProviderProps}>
			{children}
			<div id="popups">
				{lightboxes.map(a => (<Lightbox key={'lightbox-' + a.id} data={a} />))}
				{alerts.map(a => (<Alert key={'alert-' + a.id} data={a} />))}
				{confirms.map((a) => (<Confirm key={'confirm-' + a.id} data={a} />))}
			</div>
		</PopupContext.Provider>
    );
}
