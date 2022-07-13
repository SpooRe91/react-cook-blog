import { Link } from "react-router-dom";

export const Footer = ({ setIsOpen, user }) => {

    return (
        <footer className="footer">
            <p>Copyright © designed by <Link to="https://github.com/SpooRe91" target={"_blank"} rel="noreferrer" className="btn-footer-created-by">Martin Bogdanov</Link> </p>
            {user !== null && user.id
                ? (<>
                    <Link to="#" className="btn-footer" name="about" onClick={(e) => { setIsOpen({ state: true, target: e.target.name }) }}>Относно</Link>
                    <Link to="#" className="btn-footer" name="contacts" onClick={(e) => { setIsOpen({ state: true, target: e.target.name }) }}>Контакти</Link>
                </>)
                : (<>
                    <Link to="#" className="btn-footer" name="about" onClick={(e) => { setIsOpen({ state: true, target: e.target.name }) }}>Относно</Link>
                    <Link to="#" className="btn-footer" name="contacts" onClick={(e) => { setIsOpen({ state: true, target: e.target.name }) }}>Контакти</Link>
                    <Link to="/auth/register" className="btn-footer">Регистрация</Link>
                    <Link to="/auth/login" className="btn-footer" >Вход</Link>
                </>)
            }
        </footer >
    );
}