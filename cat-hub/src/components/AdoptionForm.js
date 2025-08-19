import { useRef, useState, useEffect } from "react";
import "./AdoptionForm.css";

export default function AdoptionForm({ initialPreferredCat = "", onSubmitted }) {
    const formRef = useRef(null);

    // --- core applicant fields (required) ---
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [preferredCat, setPreferredCat] = useState(initialPreferredCat)
    // synchronizace, if the value preferredCat changes
    useEffect(() => {
    setPreferredCat(initialPreferredCat);
    }, [initialPreferredCat]);

    // --- housing (radio + conditional "other") ---
    const [stayPlace, setStayPlace] = useState(""); // 'house' | 'apartment' | 'other'
    const [stayPlaceOther, setStayPlaceOther] = useState("");
    const isOtherStay = stayPlace === "other";

    // --- household ---
    const [householdMembers, setHouseholdMembers] = useState("");
    const [children, setChildren] = useState(""); // 'yes' | 'no'

    // --- additional blocks you asked to add ---
    const [hasPets, setHasPets] = useState(""); // 'yes' | 'no'
    const [petsWhich, setPetsWhich] = useState(""); // text required when hasPets==='yes'
    const needPetsWhich = hasPets === "yes";

    const [experienceCats, setExperienceCats] = useState(""); // 'yes' | 'no'

    // Indoors/garden options
    const [outdoorAccess, setOutdoorAccess] = useState("");
    // 'indoors_only' | 'indoors_secured_balcony' | 'garden_supervised' | 'garden_free_access'

    // Windows/balcony secured
    const [windowsSecured, setWindowsSecured] = useState(""); // 'yes' | 'planning' | 'no'

    // Work setup
    const [workSetup, setWorkSetup] = useState(""); // 'on_site' | 'hybrid' | 'home_office'

    // Cat alone time
    const [aloneTime, setAloneTime] = useState(""); // '<2'|'2-4'|'4-6'|'6-8'|'>8'

    // Vacation pet sitting
    const [vacationSitting, setVacationSitting] = useState(""); // 'yes'|'not_yet'|'no'

    // Consents
    const [spayVaccinationConsent, setSpayVaccinationConsent] = useState(""); // 'yes'|'no'|'not_sure'
    const [adoptionContractConsent, setAdoptionContractConsent] = useState(""); // 'yes'|'no'

    // Notes
    const [notes, setNotes] = useState("");

    //Submit status
    const [submitStatus, setSubmitStatus] = useState('idle');   // 'idle' | 'sending' | 'success' | 'error'
    const [submitMsg, setSubmitMsg] = useState('');
    const [showErrors, setShowErrors] = useState(false);

//   Timer  
const closeTimer = useRef(null);
    useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

// Submit
const formSubmit = async (e) => {
    e.preventDefault();

const formOK = formRef.current?.checkValidity?.();
if (!formOK) {
    setShowErrors(true);
    formRef.current?.reportValidity?.();
return;
}
//if it's OK, do not show
setShowErrors(false);

  setSubmitStatus('sending');
  setSubmitMsg('');
    const payload = { 
        fullName, 
        email, 
        phoneNumber, 
        address, 
        age: Number(age), 
        preferredCat, 
        stayPlace, 
        stayPlaceOther: isOtherStay ? stayPlaceOther.trim() : "", 
        householdMembers: householdMembers === "" ? null : Number(householdMembers), 
        children, 
        hasPets, 
        petsWhich: needPetsWhich ? petsWhich.trim() : "", 
        experienceCats, 
        outdoorAccess, 
        windowsSecured, 
        workSetup, 
        aloneTime, 
        vacationSitting, 
        spayVaccinationConsent, 
        adoptionContractConsent, 
        notes: notes.trim(), 
        submittedAt: new Date().toISOString(), 
    };
   
  try {
    // await fetch('/api/apply', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload) });
    setSubmitStatus('success');
    setSubmitMsg("Thanks! Your application was sent. We'll be in touch soon.");
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => onSubmitted?.(payload), 2500);
  } catch (err) {
    setSubmitStatus('error');
    setSubmitMsg('Submission failed. Please try again.');
  }
};

const handleInvalid = () => {
    setShowErrors(true);
};

  return (
    <article>
      <p className="microcopy">
        No answer is right or wrong. We use the information only to match you with the right cat.
      </p>

      <form 
        ref={formRef} 
        className={`form ${showErrors ? 'show-errors' : ''}`}
        onSubmit={formSubmit}
        onInvalid={handleInvalid}
        >
        {/* NAME */}
        <label htmlFor="name">Name:</label>
        <input
            id="name"
            autoFocus
            type="text"
            name="name"
            required
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
        />

        {/* E-MAIL */}
        <label htmlFor="email">E-mail:</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PHONE */}
        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          required
          autoComplete="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        {/* ADDRESS */}
        <label htmlFor="address">Address:</label>
        <input
          id="address"
          type="text"
          name="address"
          required
          autoComplete="street-address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        {/* AGE */}
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          name="age"
          required
          min={15}
          max={120}
          step={1}
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        {/* PREFERRED CAT */}
        <label htmlFor="preferredCat">Which cat do you want to adopt?</label>
        <input
          id="preferredCat"
          type="text"
          name="preferredCat"
          required
          value={preferredCat}
          onChange={(e) => setPreferredCat(e.target.value)}
        />

        {/* PLACE OF STAY */}
        <fieldset className="select">
          <legend>Where do you live?</legend>

          <label htmlFor="stay-house">
            <input
              id="stay-house"
              type="radio"
              name="stayPlace"
              value="house"
              checked={stayPlace === "house"}
              onChange={(e) => setStayPlace(e.target.value)}
              required
            />
            House
          </label>

          <label htmlFor="stay-apartment">
            <input
              id="stay-apartment"
              type="radio"
              name="stayPlace"
              value="apartment"
              checked={stayPlace === "apartment"}
              onChange={(e) => setStayPlace(e.target.value)}
            />
            Apartment
          </label>

          <label htmlFor="stay-other">
            <input
              id="stay-other"
              type="radio"
              name="stayPlace"
              value="other"
              checked={stayPlace === "other"}
              onChange={(e) => setStayPlace(e.target.value)}
            />
            Other
          </label>

          {/* Text field for "Other" — required only when 'other' */}
          <label htmlFor="stay-other-text" className="sr-only">
            Specify other
          </label>
          <input
            id="stay-other-text"
            type="text"
            name="stayPlaceOther"
            placeholder="If other, please specify."
            value={stayPlaceOther}
            onChange={(e) => setStayPlaceOther(e.target.value)}
            disabled={!isOtherStay}
            required={isOtherStay}
            aria-hidden={!isOtherStay}
          />
        </fieldset>

        {/* HOUSEHOLD MEMBERS */}
        <label htmlFor="householdMembers">How many people live in your household?</label>
        <input
          id="householdMembers"
          type="number"
          name="householdMembers"
          required
          min={1}
          max={30}
          step={1}
          value={householdMembers}
          onChange={(e) => setHouseholdMembers(e.target.value)}
        />

        {/* CHILDREN */}
        <fieldset className="select">
          <legend>Do you have children?</legend>
          <label htmlFor="children-yes">
            <input
              id="children-yes"
              type="radio"
              name="children"
              value="yes"
              checked={children === "yes"}
              onChange={(e) => setChildren(e.target.value)}
              required
            />
            Yes
          </label>
          <label htmlFor="children-no">
            <input
              id="children-no"
              type="radio"
              name="children"
              value="no"
              checked={children === "no"}
              onChange={(e) => setChildren(e.target.value)}
            />
            No
          </label>
        </fieldset>

        {/* PETS (same principle as "Other"): Yes => show required text */}
        <fieldset className="select">
          <legend>Do you have pets?</legend>
          <label htmlFor="pets-yes">
            <input
              id="pets-yes"
              type="radio"
              name="hasPets"
              value="yes"
              checked={hasPets === "yes"}
              onChange={(e) => setHasPets(e.target.value)}
              required
            />
            Yes
          </label>
          <label htmlFor="pets-no">
            <input
              id="pets-no"
              type="radio"
              name="hasPets"
              value="no"
              checked={hasPets === "no"}
              onChange={(e) => setHasPets(e.target.value)}
            />
            No
          </label>

          <label htmlFor="pets-which" className="sr-only">Which pets?</label>
          <input
            id="pets-which"
            type="text"
            placeholder="If yes, which?"
            value={petsWhich}
            onChange={(e) => setPetsWhich(e.target.value)}
            disabled={!needPetsWhich}
            required={needPetsWhich}
            aria-hidden={!needPetsWhich}
          />
        </fieldset>

        {/* Experience with cats (Yes/No as requested) */}
        <fieldset className="select">
          <legend>Do you have experience with keeping cats?</legend>
          <label htmlFor="exp-yes">
            <input
              id="exp-yes"
              type="radio"
              name="experienceCats"
              value="yes"
              checked={experienceCats === "yes"}
              onChange={(e) => setExperienceCats(e.target.value)}
              required
            />
            Yes
          </label>
          <label htmlFor="exp-no">
            <input
              id="exp-no"
              type="radio"
              name="experienceCats"
              value="no"
              checked={experienceCats === "no"}
              onChange={(e) => setExperienceCats(e.target.value)}
            />
            No
          </label>
        </fieldset>

        {/* Indoors vs Garden */}
        <fieldset className="select">
          <legend>Will the cat go to the garden or be indoors only?</legend>
          <label htmlFor="oa-indoors-only">
            <input
              id="oa-indoors-only"
              type="radio"
              name="outdoorAccess"
              value="indoors_only"
              checked={outdoorAccess === "indoors_only"}
              onChange={(e) => setOutdoorAccess(e.target.value)}
              required
            />
            Indoors only
          </label>
          <label htmlFor="oa-secured-balcony">
            <input
              id="oa-secured-balcony"
              type="radio"
              name="outdoorAccess"
              value="indoors_secured_balcony"
              checked={outdoorAccess === "indoors_secured_balcony"}
              onChange={(e) => setOutdoorAccess(e.target.value)}
            />
            Indoors + secured balcony
          </label>
          <label htmlFor="oa-garden-supervised">
            <input
              id="oa-garden-supervised"
              type="radio"
              name="outdoorAccess"
              value="garden_supervised"
              checked={outdoorAccess === "garden_supervised"}
              onChange={(e) => setOutdoorAccess(e.target.value)}
            />
            Garden (supervised)
          </label>
          <label htmlFor="oa-garden-free">
            <input
              id="oa-garden-free"
              type="radio"
              name="outdoorAccess"
              value="garden_free_access"
              checked={outdoorAccess === "garden_free_access"}
              onChange={(e) => setOutdoorAccess(e.target.value)}
            />
            Garden (free access)
          </label>
        </fieldset>

        {/* Windows / Balcony secured */}
        <fieldset className="select">
          <legend>Do you have secured windows and balcony?</legend>
          <label htmlFor="ws-yes">
            <input
              id="ws-yes"
              type="radio"
              name="windowsSecured"
              value="yes"
              checked={windowsSecured === "yes"}
              onChange={(e) => setWindowsSecured(e.target.value)}
              required
            />
            Yes
          </label>
          <label htmlFor="ws-planning">
            <input
              id="ws-planning"
              type="radio"
              name="windowsSecured"
              value="planning"
              checked={windowsSecured === "planning"}
              onChange={(e) => setWindowsSecured(e.target.value)}
            />
            No – planning
          </label>
          <label htmlFor="ws-no">
            <input
              id="ws-no"
              type="radio"
              name="windowsSecured"
              value="no"
              checked={windowsSecured === "no"}
              onChange={(e) => setWindowsSecured(e.target.value)}
            />
            No
          </label>
        </fieldset>

        {/* Work setup */}
        <fieldset className="select">
          <legend>Work setup</legend>
          <label htmlFor="work-onsite">
            <input
              id="work-onsite"
              type="radio"
              name="workSetup"
              value="on_site"
              checked={workSetup === "on_site"}
              onChange={(e) => setWorkSetup(e.target.value)}
              required
            />
            On-site
          </label>
          <label htmlFor="work-hybrid">
            <input
              id="work-hybrid"
              type="radio"
              name="workSetup"
              value="hybrid"
              checked={workSetup === "hybrid"}
              onChange={(e) => setWorkSetup(e.target.value)}
            />
            Hybrid
          </label>
          <label htmlFor="work-home">
            <input
              id="work-home"
              type="radio"
              name="workSetup"
              value="home_office"
              checked={workSetup === "home_office"}
              onChange={(e) => setWorkSetup(e.target.value)}
            />
            Home office
          </label>
        </fieldset>
                {/* Alone time */}
                <fieldset className="select">
            <legend>How long would the cat be alone at home (typical day)?</legend>

            {["<2", "2-4", "4-6", "6-8", ">8"].map((opt, i) => (
                <label key={opt} htmlFor={`alone-${i}`}>
                <input
                    id={`alone-${i}`}
                    type="radio"
                    name="aloneTime"
                    value={opt}
                    required={i === 0}             
                    checked={aloneTime === opt}
                    onChange={(e) => setAloneTime(e.target.value)}
                />
                {opt} h
                </label>
            ))}
        </fieldset>

        {/* Vacation pet sitting (no extra text, per your request) */}
        <fieldset className="select">
          <legend>Do you have pet sitting arranged for vacations?</legend>
          <label htmlFor="vac-yes">
            <input
              id="vac-yes"
              type="radio"
              name="vacationSitting"
              value="yes"
              checked={vacationSitting === "yes"}
              onChange={(e) => setVacationSitting(e.target.value)}
              required
            />
            Yes
          </label>
          <label htmlFor="vac-notyet">
            <input
              id="vac-notyet"
              type="radio"
              name="vacationSitting"
              value="not_yet"
              checked={vacationSitting === "not_yet"}
              onChange={(e) => setVacationSitting(e.target.value)}
            />
            Not yet
          </label>
          <label htmlFor="vac-no">
            <input
              id="vac-no"
              type="radio"
              name="vacationSitting"
              value="no"
              checked={vacationSitting === "no"}
              onChange={(e) => setVacationSitting(e.target.value)}
            />
            No
          </label>
        </fieldset>

        {/* Consents */}
        <fieldset className="select">
          <legend>Do you agree with neutering and regular vaccination?</legend>
          <label htmlFor="sv-yes">
            <input
              id="sv-yes"
              type="radio"
              name="spayVaccinationConsent"
              value="yes"
              checked={spayVaccinationConsent === "yes"}
              onChange={(e) => setSpayVaccinationConsent(e.target.value)}
              required
            />
            Yes
          </label>
          <label htmlFor="sv-no">
            <input
              id="sv-no"
              type="radio"
              name="spayVaccinationConsent"
              value="no"
              checked={spayVaccinationConsent === "no"}
              onChange={(e) => setSpayVaccinationConsent(e.target.value)}
            />
            No
          </label>
          <label htmlFor="sv-notsure">
            <input
              id="sv-notsure"
              type="radio"
              name="spayVaccinationConsent"
              value="not_sure"
              checked={spayVaccinationConsent === "not_sure"}
              onChange={(e) => setSpayVaccinationConsent(e.target.value)}
            />
            Not sure
          </label>
        </fieldset>

        <fieldset className="select">
          <legend>Do you agree to sign the adoption contract and pay the 700 CZK fee?</legend>
          <label htmlFor="acc-yes">
            <input
              id="acc-yes"
              type="radio"
              name="adoptionContractConsent"
              value="yes"
              checked={adoptionContractConsent === "yes"}
              onChange={(e) => setAdoptionContractConsent(e.target.value)}
              required
            />
            Yes
          </label>
          <label htmlFor="acc-no">
            <input
              id="acc-no"
              type="radio"
              name="adoptionContractConsent"
              value="no"
              checked={adoptionContractConsent === "no"}
              onChange={(e) => setAdoptionContractConsent(e.target.value)}
            />
            No
          </label>
        </fieldset>

        {/* Anything else */}
        <label htmlFor="notes">Anything else you’d like to tell us?</label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="(optional)"
        />

        {/* Honeypot anti-spam – hidden to user */}
        <input
          type="text"
          name="company"
          className="hp"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {submitStatus !== 'idle' && (
            <p role="status" aria-live="polite" className={`form-banner ${submitStatus}`}>
                {submitMsg}
            </p>
        )}

        <button 
            type="submit" 
            className="btn" 
            disabled={submitStatus === 'sending'}
        >
            Apply for adoption
        </button>
      </form>
    </article>
  );
}
