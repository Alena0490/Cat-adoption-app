import { Link } from "react-router-dom"
import OneCat from "../components/OneCat";

const Cats = () => {
    return (
        <div className="cats">
            <h1>Cats for adoption</h1>
            <OneCat />
        </div>
    )
}

export default Cats;