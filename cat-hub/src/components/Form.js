import { useState } from "react";
import './Form.css';
import { FaUser, FaAt, FaPen } from "react-icons/fa";

const Form = () => {
  const [fullName, setFullName]   = useState('');
  const [email, setEmail]         = useState('');
  const [message, setMessage]     = useState('');
  const [touched, setTouched]     = useState({ name:false, email:false, message:false });
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const nameErr    = touched.name    && fullName.trim() === '';
  const emailErr   = touched.email   && !isValidEmail(email);
  const messageErr = touched.message && message.trim() === '';

  const formSubmit = async (e) => {
    e.preventDefault();

    // honeypot – hidden field "company"
    const data = new FormData(e.currentTarget);
    if (data.get('company')) return;

    // When submitting, mark the input fields as "affected" to show errors.
    setTouched({ name:true, email:true, message:true });

    if (!fullName.trim() || !isValidEmail(email) || !message.trim()) {
      setSubmitted(false);
      setFormError('Please fix the highlighted fields.');
      return;
    }

    try {
      // TODO: sending(EmailJS / backend)
      setSubmitted(true);
      setFormError(''); //clear form
      // setFullName(''); setEmail(''); setMessage(''); setTouched({name:false,email:false,message:false});
    } catch (err) {
      setSubmitted(false);
      setFormError('Sending failed. Please try again.');
    }
  };

  return (
    <article className="form-wrap">
      <h2>Contact Form</h2>

      {submitted && (
        <p className="form-status success" role="status" aria-atomic="true">
          Thanks! Your message was sent.
        </p>
      )}
      {formError && (
        <p className="form-status error" role="alert">
          {formError}
        </p>
      )}

      <form className="form" onSubmit={formSubmit} noValidate>
        <label htmlFor="name"><FaUser />Name:</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={fullName}
          onChange={(e)=>setFullName(e.target.value)}
          onBlur={()=>setTouched(t=>({...t, name:true}))}
          aria-invalid={nameErr || undefined}
          aria-describedby={nameErr ? "name-err" : undefined}
        />
        {nameErr && <small id="name-err" role="alert">Please enter your name.</small>}

        <label htmlFor="email"><FaAt />E-mail:</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          onBlur={()=>setTouched(t=>({...t, email:true}))}
          aria-invalid={emailErr || undefined}
          aria-describedby={emailErr ? "email-err" : undefined}
        />
        {emailErr && <small id="email-err" role="alert">Enter a valid e-mail.</small>}

        <label htmlFor="message"><FaPen />Message:</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          spellCheck="true"
          maxLength={2000}
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
          onBlur={()=>setTouched(t=>({...t, message:true}))}
          aria-invalid={messageErr || undefined}
          aria-describedby={messageErr ? "msg-err" : undefined}
        />
        {messageErr && <small id="msg-err" role="alert">Message can’t be empty.</small>}

        {/* Honeypot anti spam – not visible to user */}
        <input
          type="text"
          name="company"
          className="hp"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <button type="submit" className="btn">Send a message</button>
      </form>
    </article>
  );
};

export default Form;
