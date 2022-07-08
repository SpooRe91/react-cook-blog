import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="footer">
            <p>Copyright © designed by Martin Bogdanov</p>
            <Link to="/about" className="btn-footer">Относно</Link>
            <Link to="/contacts" className="btn-footer">Контакти</Link>
        </footer>
    );
}