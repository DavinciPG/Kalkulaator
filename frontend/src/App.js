import './App.css';

import { useState } from 'react';
import axios from 'axios';

function App() {
    const [displayValue, setDisplayValue] = useState('0');
    const [currentValue, setCurrentValue] = useState('');
    const [operator, setOperator] = useState('');
    const [currentOperand, setCurrentOperand] = useState('');
    const [resultValue, setResultValue] = useState('');

    const handleNumberClick = (number) => {
        if (operator === '') {
            setCurrentOperand(currentOperand + number);
            setDisplayValue(currentOperand + number);
        } else {
            setCurrentValue(currentValue + number);
            setDisplayValue(currentValue + number);
        }
    };

    const handleOperatorClick = (op) => {
        if (currentOperand !== '' && currentValue === '') {
            setOperator(op);
        }
    };

    const handleEqualsClick = async () => {
        if (currentValue !== '') {
            try {
                const response = await axios.post('http://localhost:3000/calculate', {
                    operator,
                    num1: parseFloat(currentOperand),
                    num2: parseFloat(currentValue),
                });
                const result = response.data.result.toString();
                setDisplayValue(result);
                setCurrentValue('');
                setCurrentOperand(result);
                setOperator('');
                setResultValue(result);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleClearClick = () => {
        if (operator === '') {
            setCurrentOperand(currentOperand.slice(0, -1));
            setDisplayValue(currentOperand.slice(0, -1));
        } else {
            setCurrentValue(currentValue.slice(0, -1));
            setDisplayValue(currentValue.slice(0, -1));
        }

        setResultValue(resultValue.slice(0, -1));
    };


    return (
        <div className="calculator-app">
            <div className="calculator-display">
                <input type="text" value={displayValue} readOnly />
            </div>
            <div className="calculator-buttons">
                <div className="button-row">
                    <button className="calculator-button" onClick={() => handleNumberClick('7')}>7</button>
                    <button className="calculator-button" onClick={() => handleNumberClick('8')}>8</button>
                    <button className="calculator-button" onClick={() => handleNumberClick('9')}>9</button>
                    <button className="calculator-button" onClick={() => handleOperatorClick('/')}>/</button>
                </div>
                <div className="button-row">
                    <button className="calculator-button" onClick={() => handleNumberClick('4')}>4</button>
                    <button className="calculator-button" onClick={() => handleNumberClick('5')}>5</button>
                    <button className="calculator-button" onClick={() => handleNumberClick('6')}>6</button>
                    <button className="calculator-button" onClick={() => handleOperatorClick('*')}>*</button>
                </div>
                <div className="button-row">
                    <button className="calculator-button" onClick={() => handleNumberClick('1')}>1</button>
                    <button className="calculator-button" onClick={() => handleNumberClick('2')}>2</button>
                    <button className="calculator-button" onClick={() => handleNumberClick('3')}>3</button>
                    <button className="calculator-button" onClick={() => handleOperatorClick('-')}>-</button>
                </div>
                <div className="button-row">
                    <button className="calculator-button" onClick={() => handleNumberClick('0')}>0</button>
                    <button className="calculator-button" onClick={handleClearClick}>C</button>
                    <button className="calculator-button" onClick={() => handleOperatorClick('+')}>+</button>
                    <button className="calculator-button" onClick={handleEqualsClick}>=</button>
                </div>
            </div>
        </div>
    );
}

export default App;
