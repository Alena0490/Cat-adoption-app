import FAQ from "../components/FAQ";
import './About.css';

const About = () => {

    const conditions = [
  { title: "Minimum Age 18+", text: "Adopters must be at least 18 years old. If you appear under 25, our team may ask to confirm your age during the visit. Applications from minors must be submitted by a legal guardian." },
  { title: "Veterinary Care Commitment", text: "You agree to provide ongoing veterinary care (routine check-ups, core vaccinations, parasite control) and to spay/neuter the cat when age-appropriate. For kittens adopted before surgery, you agree to complete spay/neuter by the date set in the contract (typically around 5–6 months of age) and share proof if requested." },
  { title: "Adoption Contract & Fee", text: "You sign our standard adoption contract and pay a non-refundable adoption fee. The fee helps cover veterinary care (vaccinations, deworming, microchip, and spay/neuter when age-appropriate) and daily costs. A receipt and the cat’s medical record are provided." },
  { title: "Meet & Greet Visit", text: "Please attend a scheduled visit to meet the cat and discuss your household, resident pets, and expectations. This helps us make a safe, lasting match and gives you time to ask care questions." }
];

    return (
        <div className="about page">
            <section className="about-hero" aria-labelledby="about-title">
                <div className="content">
                    <h1 id="about-title">About Us</h1>
                    <div className="about-intro" aria-labelledby="about-title">           
                        <p className="lead section-lead">
                            We connect cats with responsible adopters and provide the&nbsp;care they need along the way.
                        </p>
                        <p>
                            <strong>How we work:</strong> we assess each cat’s health and temperament, place them in foster care when needed,
                            and prepare them for adoption (vaccines, deworming, microchip, and&nbsp;spay/neuter when age-appropriate). You’ll find our Adoption Conditions below and a FAQ at the end of this page.
                        </p>
                    </div>
                </div>

                <div class="cat">
                    <div class="ear ear--left"></div>
                    <div class="ear ear--right"></div>
                    <div class="face">
                        <div class="eye eye--left">
                            <div class="eye-pupil"></div>
                        </div>
                        <div class="eye eye--right">
                            <div class="eye-pupil"></div>
                        </div>
                        <div class="muzzle"></div>
                    </div>
                </div>
            </section>

            {/* CAT  */}
            {/* <section className="kitty">
                
            </section> */}
        {/* CAT -END  */}

            <section id="adoption-terms" className="conditions" aria-labelledby="conditions-title">
                <h2 id="conditions-title">Adoption Conditions</h2>

                <ul className="conditions-grid">
                    {conditions.map(c => (
                    <li className="cond-card" key={c.title}>
                        <h3>{c.title}</h3>
                        <p>{c.text}</p>
                    </li>
                    ))}
                </ul>
            </section> 

            <FAQ/>
        </div>
    )
}

export default About;