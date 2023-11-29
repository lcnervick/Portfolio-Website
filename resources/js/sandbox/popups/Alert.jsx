import React from "react";
import Lightbox from "./Lightbox";

import successIcon from '../../../images/ok.png';
import failIcon from '../../../images/fail.png';
import warnIcon from '../../../images/warning.png';
import infoIcon from '../../../images/info.png';
import usePopups from "./Popups";


// This function takes the data.Message from Alert and returns a string or a
// react component so that showLightbox's 2nd argument can be anything.
function AlertBody({ Message, actions }) {
	if (typeof Message === 'function') return <Message popup={{ close: actions.close }} />;
	return <div>{ Message }</div>;
}

export default function Alert({ data }) {
    const { closeAlert } = usePopups();
	const close = () => { 
        closeAlert(data.id);
        data.callback();
    };

    let iconType;
    switch (data.type) {
        case 'success':
            iconType = successIcon; break;
        case 'fail':
            iconType = failIcon; break;
        case 'warn':
            iconType = warnIcon; break;
        default:
            iconType = infoIcon; break;
    }
    const iconProps = {
        action: close,
        image: iconType
    };

    return (
        <Lightbox data={data} icon={iconProps}>
            <AlertBody Message={data.Message} actions={{ close }} />
            <button
                className='button invert center'
                style={{display: 'block', marginTop: '1rem'}}
                onClick={() => { close(); }}
            >
            OK
            </button>
        </Lightbox>
	);
}
