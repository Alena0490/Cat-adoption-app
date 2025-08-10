import './Question.css';
import { useState } from 'react';
import { FaAnglesDown } from "react-icons/fa6";

const Question = ({ id, question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="question">
            <section>
                <h3 className='questionH3'>{question}</h3>
                <button 
                    className='toggle-button' 
                    aria-label="Show answer"
                    aria-expanded={isOpen}
                    aria-controls={`ans-${id}`}
                    onClick={()=>setIsOpen(v=>!v)}>
                        <FaAnglesDown />
                </button>
            </section>    
            {isOpen && <p id={`ans-${id}`}>{answer}</p>}
        </div>
    );
}

export default Question;