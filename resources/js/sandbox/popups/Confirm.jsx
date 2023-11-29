import React from "react";
import Lightbox from "./Lightbox";
import questionIcon from '../../../images/question.png';
import usePopups from "./Popups";

// This function takes the data.Message from Confirm and returns a string or a
// react component so that showLightbox's 2nd argument can be anything.
function ConfirmBody({ Message, actions }) {
	if (typeof Message === 'function') return <Message popup={{ close: actions.close }} />;
	return <div>{ Message }</div>;
}

export default function Confirm({ data }) {
    const { closeConfirm } = usePopups();
	const close = (confirmed) => { 
        closeConfirm(data.id);
        data.callback(confirmed);
    };

    return (
        <Lightbox data={data} icon={{ image: questionIcon, action: null }}>
            <ConfirmBody Message={data.Message} actions={{ close }} />
            <div className="button-container">
				<button
					className='button'
					onClick={() => { close(true); }}
				>
				YES
				</button>

				<button
					className='button dark-button'
					onClick={() => { close(false); }}
				>
				NO
				</button>
			</div>
        </Lightbox>
	);
}
