import { useState } from "react"
import './Form.css';
import { FaUser } from "react-icons/fa";
import { FaAt } from "react-icons/fa";
import { FaPen } from "react-icons/fa";

const  Form = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [touched, setTouched] = useState({ name:false, email:false, message:false });

    const formSubmit = (event) => {
    event.preventDefault()
    const emailOk = /.+@.+\..+/.test(email);
    if (!fullName || !emailOk || !message) return; // případně zobraz toast
    // TODO: odeslání (EmailJS / backend)
  }

    return (
        <article className="form-wrap">
            <h2>Contact Form</h2>
            <form className="form" onSubmit={formSubmit} noValidate>
                <label htmlFor="name"><FaUser />Name:</label>
                <input
                    id="name" name="name" type="text" required
                    value={fullName}
                    onChange={(e)=>setFullName(e.target.value)}
                    onBlur={()=>setTouched(t=>({...t, name:true}))}
                    aria-invalid={touched.name && !fullName}
                    aria-describedby="name-err"
                />
                {touched.name && !fullName && <small id="name-err" role="alert">Please enter your name.</small>}
                
                <label htmlFor="email"><FaAt />E-mail:</label>
                <input
                    id="email" name="email" type="email" required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    onBlur={()=>setTouched(t=>({...t, email:true}))}
                    aria-invalid={touched.email && !/.+@.+\..+/.test(email)}
                    aria-describedby="email-err"
                />
                {touched.email && !/.+@.+\..+/.test(email) && <small id="email-err" role="alert">Enter a valid e-mail.</small>}
                
                <label htmlFor="textarea"><FaPen />Message:</label>
                <textarea rows="4" id="textarea" name="message" required
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                    onBlur={()=>setTouched(t=>({...t, message:true}))}
                    aria-invalid={touched.message && !message}
                    aria-describedby="msg-err"
                />
                {touched.message && !message && <small id="msg-err" role="alert">Message can’t be empty.</small>}

                <input type="submit" value="Send a message" className="btn" />
            </form> 
        </article>       
    )
}

export default Form;