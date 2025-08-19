import './FAQ.css';
import Question from './Question';
import faqData from '../faqData';   

const FAQ = () => {
    return (
    <section className="faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
        {faqData.map((item) => (
            <Question
                className="faq-question"
                key={item.id}
                id={item.id}
                question={item.question}
                answer={item.answer}
             />
        ))}
        </div>
    </section>
    )
}

export default FAQ;   