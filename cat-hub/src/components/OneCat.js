import './OneCat.css';
import { FaMars, FaVenus } from 'react-icons/fa';

const OneCat = ({ cat, onAdopt }) => {
  if (!cat) return null;

  const { id, image, name, description, sex, age, breed, castration, adopted } = cat;

  const statusClass = adopted ? 'unavailable' : 'available';

  // klient is created only once
  let paymentsClient = null;



  // 🟢 own async funkcion
  const openDonate = async () => {
    if (!paymentsClient) {
      paymentsClient = new window.google.payments.api.PaymentsClient({ environment: 'TEST' });
    }

    const request = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["VISA", "MASTERCARD"],
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "example", // on production use a real payment
              gatewayMerchantId: "exampleMerchantId",
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: "12345678901234567890", // test ID
        merchantName: "Cat Hub Donations",
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPrice: "5.00",
        currencyCode: "EUR",
        countryCode: "CZ",
      },
    };

    try {
      const result = await paymentsClient.loadPaymentData(request);
      console.log("Payment succesfull:", result);
      alert(`You just made ${name} purr with happiness! 🐾 Thank you for the donation.`);
    } catch (err) {
      console.error("Your payment was cancelled or could not be processed. Please try again.", err);
    }
  };

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
            onClick={() => openDonate(id, name)}
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
