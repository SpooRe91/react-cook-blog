import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Common.module.css";

import { LoggedUserContext } from "../../contexts/LoggedUserContext";

export const Footer = ({ setIsOpen }) => {
    const { user } = useContext(LoggedUserContext);

    return (
        <footer className={styles["footer"]}>
            <p>
                Copyright © designed by{" "}
                <a
                    href="https://github.com/SpooRe91"
                    target={"_blank"}
                    rel="noreferrer"
                    className={styles["btn-footer-created-by"]}
                >
                    Martin Bogdanov
                </a>{" "}
            </p>
            {user?.token ? (
                <>
                    <Link
                        to="#"
                        className={styles["btn-footer"]}
                        name="about"
                        onClick={(e) => {
                            setIsOpen({ state: true, target: e.target.name });
                        }}
                    >
                        Относно
                    </Link>
                    <Link
                        to="#"
                        className={styles["btn-footer"]}
                        name="contacts"
                        onClick={(e) => {
                            setIsOpen({ state: true, target: e.target.name });
                        }}
                    >
                        Контакти
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        to="#"
                        className={styles["btn-footer"]}
                        name="about"
                        onClick={(e) => {
                            setIsOpen({ state: true, target: e.target.name });
                        }}
                    >
                        Относно
                    </Link>
                    <Link
                        to="#"
                        className={styles["btn-footer"]}
                        name="contacts"
                        onClick={(e) => {
                            setIsOpen({ state: true, target: e.target.name });
                        }}
                    >
                        Контакти
                    </Link>
                    <Link to="/auth/register" className={styles["btn-footer"]}>
                        Регистрация
                    </Link>
                    <Link to="/auth/login" className={styles["btn-footer"]}>
                        Вход
                    </Link>
                </>
            )}
        </footer>
    );
};
