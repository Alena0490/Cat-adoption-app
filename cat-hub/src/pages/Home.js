import { Link } from "react-router-dom"
import "./Home.css";

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <h1>Welcome to Cat Hub</h1>
                <p className="introduction">Your one-stop destination for adopting cats.</p>
            </section>
            <section className="mission page">
                <h2>Our Mission</h2>
                <p>We are dedicated to finding loving homes for cats in need. Our mission is to promote cat adoption and provide resources for cat care. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. </p>
            </section>
        </div>
    )
}

export default Home;