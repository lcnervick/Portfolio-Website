import React, { useState, useRef, useEffect, useCallback } from 'react';
import ccLogo from '../../../images/credit-card-logos.png';
import useInputValidation from '../InputValidation/InputValidation';
import usePopups from '../popups/Popups';
import './CreditCardInput.css';

export default function CreditCardInput() {
    const { showLightbox, showAlert } = usePopups();

    const cardDef = {
        type: '',
        number: '',
        name: '',
        expMonth: '',
        expYear: '',
        ccv: '',
        zip: ''
    };

    // Credit Card Info State
    const [creditCard, setCreditCard] = useState(cardDef);    

    // Input Refs for Auto-Focus Functionality
    const cardNumber = useRef({ validated: false });
    const cardName = useRef({ validated: false });
    const cardExp = useRef({ validated: false });
    const cardCCV = useRef({ validated: false });
    const cardZip = useRef({ validated: false });

    // Set up input validators on first render or when card type changes
    // Card Number Validator
    useEffect(() => {
        let cardPattern;
        switch (creditCard.type) {
            case 'visa':
                cardPattern = /^4\d{3} \d{4} \d{4} \d{4}$/;
                break;
                
            case 'mc':
                cardPattern = /^5[1-5][0-9]{2} \d{4} \d{4} \d{4}$/;
                break;
                    
            case 'disc':
                cardPattern = /^6(011|5\d\d) \d{4} \d{4} \d{4}$/;
                break;

            case 'amex':
                cardPattern = /^3[47]\d{2} \d{6} \d{5}$/;
                break;

            default:
                cardPattern = /^\d{16}$/;
        }
        return useInputValidation(cardNumber, cardPattern, cardExp);
    }, [creditCard.number]);

    // Card Expiration Validation
    useEffect(
        () => useInputValidation(cardExp, /^(0[1-9]|1[0-2])\/([0-9]{2})$/, cardCCV),
        [creditCard.expMonth, creditCard.expYear]
    );

    // Card CCV Validation
    useEffect(
        () => useInputValidation(cardCCV, creditCard.type === 'amex' ? /^\d{4}$/ : /^\d{3}$/, cardZip),
        [creditCard.ccv]
    );

    // Card Zip Validation
    useEffect(
        () => useInputValidation(cardZip, /^\d{5}$/, cardName),
        [creditCard.zip]
    );

    // Card Name Validation
    useEffect(
        () => useInputValidation(cardName, /^[A-Za-z.,\-\s]+$/),
        [creditCard.name]
    );

    useEffect(() => {
        cardNumber.current.focus();
    }, []);

    // Validate form and activate submit button if passed
    const validated = useCallback(() => cardNumber.current.validated
            && cardExp.current.validated
            && cardCCV.current.validated
            && cardZip.current.validated
            && cardName.current.validated
            && ['visa', 'mc', 'disc', 'amex'].includes(creditCard.type));

    const resetForm = () => {
        setCreditCard(cardDef);
        cardExp.current.removeAttribute('class');
        cardCCV.current.removeAttribute('class');
        cardZip.current.removeAttribute('class');
        cardName.current.removeAttribute('class');
        cardNumber.current.removeAttribute('class');
        cardNumber.current.focus();
    };

    // Check Card Number and Set Card Type Accordingly
    const handleCardNumber = (e) => {
        let type = '';
        let value = e.target.value.replace(/\D/g, '');

        if (value.match(/^4/) != null) type = "visa";
        else if (value.match(/^3/) != null) type = "amex";
        else if (value.match(/^5/) != null) type = "mc";
        else if (value.match(/^6/) != null) type = "disc";

        setCreditCard(prevState => ({
            ...prevState,
            type,
            number: value
        }));

        // format number with appropriate spaces
        if (type === 'amex') value = [value.substring(0, 4), value.substring(4, 10), value.substring(10, 15)].join(' ').trim();
        else value = [value.substring(0, 4), value.substring(4, 8), value.substring(8, 12), value.substring(12, 16)].join(' ').trim();
    };

    // Take Exp Date and split it into year and month properties of creditCard State
    const handleCardExp = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.substring(0, 4);
        const month = value.substring(0, 2);
        const year = value.substring(2, 4);
        
        setCreditCard(prevState => ({
            ...prevState,
            expMonth: month,
            expYear: year
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreditCard(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure card details are validated
        if (validated()) {
            // Your back-end verification here
            showAlert('success', 'Thank You!', "Your card has successfully been charged $1,000,000...\n\n\nJust Kidding! This form doesn't do anything except this success message.")
            // console.log('Submitted:', creditCard);
        } else {
            showAlert("warn", "Card Not Validated", "Please enter valid credit card details");
        }
    };

    return (
        <div className="card-input-window">
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className='card-input-label'>
                    <label htmlFor='card-number'>Card #:</label>
                    <div className='card-logo-container'>
                        <div className='card-logo'>
                            <img
                                id='card-type' 
                                className={creditCard.type}
                                src={ccLogo}
                                alt="Card Type"
                            />
                            <div className={'card-logo-overlay ' + creditCard.type}>
                                <div className='visa'></div>
                                <div className='mc'></div>
                                <div className='amex'></div>
                                <div className='disc'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card-input-field'>
                    <input
                        id="card-number"
                        type="text"
                        name="number"
                        value={creditCard.number}
                        onChange={handleCardNumber}
                        ref={cardNumber}
                        maxLength="19"
                    />
                </div>

                <div className='card-input-label'>
                    <label htmlFor='card-exp' className='card-input-inline'>Exp:</label>
                    <label htmlFor='card-ccv' className='card-input-inline'>CCV:</label>
                    <label htmlFor='card-zip' className='card-input-inline'>Zip:</label>
                </div>
                <div className='card-input-field'>
                    <input
                        id='card-exp'
                        type="text"
                        name="expDate"
                        value={creditCard.expMonth + (creditCard.expYear ? ('/' + creditCard.expYear) : '')}
                        onChange={handleCardExp}
                        placeholder="MM/YY"
                        ref={cardExp}
                        maxLength="5"
                    />
                    <input 
                        id='card-ccv'
                        type="text"
                        name="ccv"
                        value={creditCard.ccv}
                        onChange={handleChange}
                        ref={cardCCV}
                        maxLength="4"
                    />
                    <input
                        id='card-zip'
                        type="text"
                        name="zip"
                        value={creditCard.zip}
                        onChange={handleChange}
                        ref={cardZip}
                        maxLength="5"
                    />
                </div>

                <div className='card-input-label'>
                    <label htmlFor='card-name'>Name on Card:</label>
                </div>
                <div className='card-input-field'>
                    <input
                        id="card-name"
                        type="text"
                        name="name"
                        value={creditCard.name}
                        onChange={handleChange}
                        ref={cardName}
                    />
                </div>

                <div className='button-container'>
                    <button type="submit" className={'button ' + (validated() ? ' active' : ' disabled')}>Submit</button>
                    <button type="button" className='button' onClick={() => { resetForm(); }}>Reset</button>
                </div>
            </form>
        </div>
    );
}
