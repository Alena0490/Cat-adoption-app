import { Link } from "react-router-dom"
import "./Home.css";
import { FaAnglesDown } from "react-icons/fa6";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { FaHandsHelping, FaPaw } from "react-icons/fa";

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <h1>Welcome to Cat Hub</h1>
                <p className="introduction">Your one-stop destination for&nbsp;adopting cats.</p>
                <div className="hero-cta">
                    <a href="/cats" className="btn btn-primary">Adopt a Cat</a>
                    <a href="/contacts#donate" className="btn btn-secondary">Support Us</a>
                </div>
                <a href="#mission" className="scroll-down" aria-label="scroll down to content">
                    <FaAnglesDown className="scroll-icon" />
                </a>
            </section>
            <section className="mission page" id="mission" aria-label="our-mission">
                <h2>Our Mission</h2>
                <p>We are dedicated to&nbsp;finding loving homes for cats in&nbsp;need. Our mission is to&nbsp;promote cat adoption and&nbsp;provide resources for&nbsp;cat care. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. </p>
            </section>

            <section className="mission page mission--alt" id="adoption" aria-label="adoption-process">
                <h2>How Adoption Works</h2>
                    <p>Adopting a&nbsp;cat is a&nbsp;rewarding process that ensures our&nbsp;furry friends find loving, responsible homes. First, browse our&nbsp;list of&nbsp;available cats and&nbsp;choose the&nbsp;one that captures your heart. Once you have made your choice, fill&nbsp;out our adoption form with your details so that we&nbsp;can learn more about you and your living environment. We then arrange a&nbsp;short meeting where you can spend time with the&nbsp;cat to&nbsp;make sure you’re a&nbsp;perfect match. If all goes well, you can complete the&nbsp;paperwork and&nbsp;take your new companion home the&nbsp;same day. Our team will also provide guidance, resources, and&nbsp;follow-up support to&nbsp;help both you and&nbsp;your cat adjust smoothly.</p>
                  
                <div className="mini-icons">
                    <Link to="/cats">
                        <FaPaw />
                        <p>Adopt</p>
                    </Link>
                    <Link to="/contacts#donate">
                        <FaHandHoldingHeart />
                        <p>Donate</p>
                    </Link>
                    <Link to="/contacts#volunteer">
                        <FaHandsHelping />
                        <p>Volunteer</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default Home;