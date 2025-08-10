import './Question.css';
import { useState } from 'react';
import { FaAnglesDown } from "react-icons/fa6";

const Question = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="question">
            <section>
                <h3 className='questionH3'>{question}</h3>
                <button 
                    className='toggle-button' 
                    ariaLabel="show answer"
                    onClick={() => setIsOpen(!isOpen)}>
                        <FaAnglesDown />
                </button>
            </section>    
            {isOpen && <p>{answer}</p>}
        </div>
    );
}

export default Question;