import './Question.css';
import { useState } from 'react';
import { FaAnglesDown } from "react-icons/fa6";

 const Question = ({ id, question, answer, className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`question ${className}`}>
            <section>
                <h3 id={`qtitle-${id}`} className="questionH3">{question}</h3>
                    <button
                    id={`qbtn-${id}`}
                    type="button"
                    className="toggle-button btn"
                    aria-expanded={isOpen}
                    aria-controls={`ans-${id}`}
                    aria-label={(isOpen ? 'Hide answer: ' : 'Show answer: ') + question}
                    onClick={() => setIsOpen(v => !v)}
                    >
                    <FaAnglesDown aria-hidden="true" focusable="false" />
                    </button>

                    <div
                    id={`ans-${id}`}
                    className="qa-panel"
                    role="region"
                    aria-labelledby={`qtitle-${id}`}
                    hidden={!isOpen}
                    >
                    <p>{answer}</p>
                    </div>
            </section>    
        </div>
    );
}

export default Question;