import './OneCat.css'; 


const OneCat = ({ cat }) => {
    return (
        <article className="one-cat">
            <img src={cat.image} alt={cat.name} />
            <h2>{cat.name}</h2>
            <p>{cat.description}</p>
            <div className="cat-details">
                <p><strong>Sex:</strong> {cat.sex} years</p>
                <p><strong>Age:</strong> {cat.age} years</p>
                <p><strong>Breed:</strong> {cat.breed}</p>
                <p><strong>Spayed/Neutered:</strong> {cat.castration ? 'Yes' : 'No'}</p>
                <p><strong>Adoption Status:</strong> {cat.adopted ? 'Adopted' : 'Available'}</p>
            </div>
            <div className="buttons">
                <button className="donate-button">Buy snack {cat.name}</button>
                <button className="adopt-button">Adopt {cat.name}</button>
            </div>
        </article>
    );
}

export default OneCat;