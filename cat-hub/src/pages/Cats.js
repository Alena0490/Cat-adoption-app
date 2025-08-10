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
        <div className="filters">
            <select value={sex} onChange={(e) => setSex(e.target.value)} aria-label="Sex">
                <option value="all">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            <select value={availability} onChange={(e) => setAvailability(e.target.value)} aria-label="Availability">
                <option value="all">Availability: All</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
            </select>

            <select value={castration} onChange={(e) => setCastration(e.target.value)} aria-label="Spayed/Neutered">
                <option value="all">Spayed/Neutered: All</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            <select value={kitten} onChange={(e) => setKitten(e.target.value)} aria-label="Age group">
                <option value="all">Age: All</option>
                <option value="only">Only kittens (&lt; 1 year)</option>
                <option value="adults">Adults (≥ 1 year)</option>
            </select>
        </div>      

      <div className="cats-list">
        {filteredCats.map(cat => (
          <OneCat key={cat.id} cat={cat} />
        ))}
      </div>
    </div>
  );
};

export default Cats;
