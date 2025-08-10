import { Link } from "react-router-dom"
import FAQ from "../components/FAQ";

const About = () => {
    return (
        <div className="about">
            <h1>About Us</h1>
            <p>We are dedicated to finding loving homes for cats in need.</p>
            <p>Our mission is to promote cat adoption and provide resources for cat care.</p>
            <FAQ/>
        </div>
    )
}

export default About;