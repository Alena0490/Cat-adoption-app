import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./Error.css";

const Error = () => {
const { pathname, search } = useLocation();
const navigate = useNavigate();
const h1Ref = useRef(null);

// a11y: po načtení zaostři na nadpis
useEffect(() => {
    h1Ref.current?.focus();
// scroll nahoru, kdyby uživatel byl dole
    window.scrollTo({ top: 0 });
}, []);

const tried = `${pathname}${search || ""}`;
    return (
        <div className="error page">
            <h1 id="err-title" tabIndex={-1} ref={h1Ref}>
                404 - Page Not Found
            </h1>
            <p className="err-text">
                Sorry, the&nbsp;page <code className="err-path">{tried}</code> doesn’t exist or&nbsp;was moved.
            </p>
            <div className="error-actions">
                <button type="button" className="btn" onClick={() => navigate(-1)}>
                    Go back
                </button>
                <Link to="/" className="btn btn-primary">
                    Go to&nbsp;Home
                </Link>
                <Link to="/cats" className="btn btn-secondary">
                    See cats
                </Link>
                <Link to="/contacts" className="btn link">
                    Contact&nbsp;us
                </Link>
            </div>
        </div>
    )
}

export default Error;