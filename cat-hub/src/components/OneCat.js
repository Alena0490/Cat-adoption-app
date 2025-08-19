import './OneCat.css';
import { FaMars, FaVenus } from 'react-icons/fa';

const OneCat = ({ cat, onAdopt }) => {
  if (!cat) return null;

  const { id, image, name, description, sex, age, breed, castration, adopted } = cat;

    // status class (available/unavailable)
  const statusClass = adopted ? 'unavailable' : 'available';

  return (
    <article className="one-cat" data-id={id}>
        <img 
            src={image} 
            alt={name} 
            loading="lazy"
            width={400}  
            height={400}  
            sizes="(max-width: 600px) 100vw, 400px" 
        />

        <h2 className="cat-name">
          {name}{' '}
          <span className="sr-only">({sex})</span>
          {sex === 'Male'
            ? <FaMars className="icon-male sex-icon" aria-hidden="true" focusable="false" />
            : <FaVenus className="icon-female sex-icon" aria-hidden="true" focusable="false" />}
        </h2>
        <p>{description}</p>

        <div className="cat-details">
            <p>
                <strong>Sex: </strong>{sex}
            </p>
            <p><strong>Age:</strong> {age}</p>
            <p><strong>Breed:</strong> {breed}</p>
            <p><strong>Spayed/Neutered:</strong> {castration ? 'Yes' : 'No'}</p>
            <p>
              <strong>Status:</strong>
              <span className={`status ${statusClass}`} role="status" aria-atomic="true">    {adopted ? 'Unavailable' : 'Available'}
              </span>
            </p>
      </div>

      <div className="buttons">
        <button 
            className="donate-button btn" 
            type="button"
            aria-label={`Buy dinner for ${name} for €5`} 
            // onClick={()=>openDonate(cat.id)}
        >
            Buy dinner (€5)
        </button>
         <button
          className={`adopt-button${adopted ? ' disabled' : ''} btn`}
          type="button"
          disabled={adopted}
          aria-disabled={adopted}
          aria-label={adopted ? `${name} is unavailable for adoption` : `Adopt ${name}`}
          onClick={() => !adopted && onAdopt?.(cat)}
        >
          {adopted ? 'Unavailable' : 'Adopt'}
        </button>
      </div>
    </article>
  );
};

export default OneCat;
