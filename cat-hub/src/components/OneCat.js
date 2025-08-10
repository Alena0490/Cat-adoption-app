import './OneCat.css';
import { FaMars, FaVenus } from 'react-icons/fa';

const OneCat = ({ cat }) => {
  if (!cat) return null;

  const { id, image, name, description, sex, age, breed, castration, adopted } = cat;

    // status class (available/unavailable)
  const statusClass = adopted ? 'status-unavailable' : 'status-available';

  return (
    <article className="one-cat" data-id={id}>
        <img src={image} alt={name} loading="lazy" />
        <h2 className="cat-name">
            {name}{' '}
            {sex === 'Male' ? (
                <FaMars className="icon-male sex-icon" aria-label="Male" />
            ) : (
                <FaVenus className="icon-female sex-icon" aria-label="Female" />
            )}
        </h2>
        <p>{description}</p>

        <div className="cat-details">
            <p>
                <strong>Sex: </strong>{sex}
            </p>
            <p><strong>Age:</strong> {age}</p>
            <p><strong>Breed:</strong> {breed}</p>
            <p><strong>Spayed/Neutered:</strong> {castration ? 'Yes' : 'No'}</p>
            <p className={statusClass}>
                <strong>Adoption Status:</strong> <span>{adopted ? 'Unavailable' : 'Available'}</span>
            </p>
      </div>

      <div className="buttons">
        <button className="donate-button" type="button">Buy snack</button>
         <button
          className={`adopt-button${adopted ? ' disabled' : ''}`}
          type="button"
          disabled={adopted}
          aria-disabled={adopted}
        >
          {adopted ? 'Unavailable' : 'Adopt'}
        </button>
      </div>
    </article>
  );
};

export default OneCat;
