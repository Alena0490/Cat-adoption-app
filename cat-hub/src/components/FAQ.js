import './FAQ.css';
import Question from './Question';
import faqData from '../faqData';   

const FAQ = () => {
    return (
        <div className="faq">
            <h2>Frequently Asked Questions</h2>
        {faqData.map((item) => (
        <Question
            className ="faq-question"
            key={item.id}
            question={item.question}
            answer={item.answer}
        />
        ))}
        </div>
    )
}

export default FAQ;   