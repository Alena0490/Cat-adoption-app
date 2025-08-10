import { useState } from "react"
import './Form.css';
import { FaUser } from "react-icons/fa";
import { FaAt } from "react-icons/fa";

const  Form = () => {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [users, setUsers] = useState([])

     const formSubmit = (event) => {
      event.preventDefault()
      console.log("The form was submitted successfully")
  }

    return (
        <article className="form-wrap">
            <h2>Contact Form</h2>
            <form className='form' onSubmit={formSubmit}>
                <label htmlFor="name"><FaUser />Name:</label>
                <input type="text" id="name" name="name" required />
                <label htmlFor="e-mail"><FaAt />E-mail:</label>
                <input type="email" id="e-mail" name="e-mail" required />
                <input type="submit" value="Send a message" />
            </form> 
        </article>       
    )
}

export default Form;