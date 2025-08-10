import { useState } from "react";
import OneCat from "../components/OneCat";
import cats from "../data"; 
import './Cats.css';

const Cats = () => {

    /*FILTER*/
    const [sex, setSex] = useState('all');           // 'all' | 'Male' | 'Female'
    const [availability, setAvailability] = useState('all'); // 'all' | 'available' | 'unavailable'
    const [castration, setCastration] = useState('all');     // 'all' | 'yes' | 'no'
    const [kitten, setKitten] = useState('all');     // 'all' | 'only' | 'adults'

    const filteredCats = cats.filter(c => {
    const isAvailable = !c.adopted;

    const okSex =
        sex === 'all' || c.sex === sex;

    const okAvailability =
        availability === 'all' ||
        (availability === 'available' && isAvailable) ||
        (availability === 'unavailable' && !isAvailable);

    const okCastration =
        castration === 'all' ||
        (castration === 'yes' && c.castration) ||
        (castration === 'no' && !c.castration);

    const okKitten =
        kitten === 'all' ||
        (kitten === 'only' && c.age.toLowerCase().includes('month')) ||
        (kitten === 'adults' && c.age.toLowerCase().includes('year'));

    return okSex && okAvailability && okCastration && okKitten;
    });

  return (
    <div className="cats page">
        <h1>Cats for adoption</h1>
        <p className="result-count" aria-live="polite">
           {filteredCats.length} cats found
        </p>
        <fieldset className="filters" aria-label="Filters">
            <legend className="sr-only">Filters</legend>

            <div className="filter">
                <label htmlFor="sex">Sex</label>
                <select id="sex" value={sex} onChange={(e) => setSex(e.target.value)}>
                <option value="all">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>
            </div>

            <div className="filter">
                <label htmlFor="availability">Availability</label>
                <select
                id="availability"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                >
                <option value="all">All</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
                </select>
            </div>

            <div className="filter">
                <label htmlFor="castration">Spayed/Neutered</label>
                <select
                id="castration"
                value={castration}
                onChange={(e) => setCastration(e.target.value)}
                >
                <option value="all">All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                </select>
            </div>

            <div className="filter">
                <label htmlFor="kitten">Age group</label>
                <select
                id="kitten"
                value={kitten}
                onChange={(e) => setKitten(e.target.value)}
                >
                <option value="all">All</option>
                <option value="only">Kittens (&lt; 1 year)</option>
                <option value="adults">Adults (≥ 1 year)</option>
                </select>
            </div>
        </fieldset>
      

      <div className="cats-list">
        {filteredCats.length === 0 ? (
      <p className="empty">No cats match your filters. Try changing criteria.</p>
        ) : (
        filteredCats.map(cat => <OneCat key={cat.id} cat={cat} />)
        )}
      </div>
    </div>
  );
};

export default Cats;
