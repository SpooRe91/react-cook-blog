import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="footer">
            <p>Copyright © designed by <a href="https://github.com/SpooRe91" className="btn-footer-created-by">Martin Bogdanov</a> </p>
            <Link to="/about" className="btn-footer">Относно</Link>
            <Link to="/contacts" className="btn-footer">Контакти</Link>
            <Link to="/auth/register" className="btn-footer">Регистрация</Link>
            <Link to="/auth/login" className="btn-footer">Вход</Link>
        </footer>
    );
}