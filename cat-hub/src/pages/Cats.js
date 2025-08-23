import { useState, useEffect, useRef, useCallback } from "react";
import { IoClose } from "react-icons/io5";
import OneCat from "../components/OneCat";
import cats from "../data";
import "./Cats.css";
import AdoptionForm from "../components/AdoptionForm";

const Cats = () => {
  /* FILTER */
  const [sex, setSex] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [castration, setCastration] = useState("all");
  const [kitten, setKitten] = useState("all");

  const filteredCats = cats.filter((c) => {
    const isAvailable = !c.adopted;

    const okSex = sex === "all" || c.sex === sex;
    const okAvailability =
      availability === "all" ||
      (availability === "available" && isAvailable) ||
      (availability === "unavailable" && !isAvailable);
    const okCastration =
      castration === "all" ||
      (castration === "yes" && c.castration) ||
      (castration === "no" && !c.castration);
    const okKitten =
      kitten === "all" ||
      (kitten === "only" && c.age.toLowerCase().includes("month")) ||
      (kitten === "adults" && c.age.toLowerCase().includes("year"));

    return okSex && okAvailability && okCastration && okKitten;
  });

  // === form show/close ===
  const [showForm, setShowForm] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [closing, setClosing] = useState(false);
  const panelRef = useRef(null);
  const closeTimer = useRef(null);

  const openForm = (cat) => {
    setSelectedCat(cat);
    setShowForm(true);
    setClosing(false);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedCat(null);
    setClosing(false);
  };

  // FIX: requestClose stabilní (řeší ESLint warning)
  const requestClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    // fallback for animation
    closeTimer.current = window.setTimeout(() => {
      closeForm();
    }, 350);
  }, [closing]); // closeForm používá setState (stabilní), stačí hlídat 'closing'

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) requestClose();
  };

  const handleAnimEnd = (e) => {
    if (closing && e.target === panelRef.current) {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      closeForm();
    }
  };

  // zavření na Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && requestClose();
    if (showForm) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showForm, requestClose]);

  // zamknutí scrollu pozadí při otevřeném panelu
  useEffect(() => {
    if (!showForm) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [showForm]);

  // fokus na panel po otevření
  useEffect(() => {
    if (showForm) panelRef.current?.focus();
  }, [showForm]);

  // timeout cleaning
  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div className="cats page">
      <h1>Cats for adoption</h1>
      <p className="section-lead">
        Meet our cats waiting for a forever home. Each one has a unique story
        and a heart full of love to share.
      </p>
      <p className="result-count" aria-live="polite" aria-atomic="true">
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
          filteredCats.map((cat) => (
            <OneCat key={cat.id} cat={cat} onAdopt={openForm} />
          ))
        )}
      </div>

      {/* Panel s formulářem */}
      {showForm && (
        <div
          className={`adopt-backdrop${closing ? " is-closing" : ""}`}
          onClick={handleBackdropClick} 
        >
          <section
            className={`adopt-sheet${closing ? " is-closing" : ""}`}
            role="dialog"
            aria-modal="true"
            aria-label="Adoption form"
            ref={panelRef}
            tabIndex={-1}
            onAnimationEnd={handleAnimEnd}
          >
            <button
              className="adopt-close"
              type="button"
              onClick={requestClose}
              aria-label="Close form"
            >
              <IoClose />
            </button>

            <AdoptionForm
              initialPreferredCat={selectedCat?.name ?? ""}
              onSubmitted={requestClose}
            />
          </section>
        </div>
      )}
    </div>
  );
};

export default Cats;
