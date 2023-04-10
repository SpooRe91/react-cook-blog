import styles from './About.module.css'

export const About = ({ setIsOpen }) => {
    return (
        <>
            <div className={styles["dark-bg"]} onClick={() => setIsOpen(false)} />
            <div className={styles["centered"]}>
                <div className={styles["already-reg"]}>
                    <h1 className={styles["already-reg"]}>Относно <span>"Cook-blog by Martin Bogdanov"</span></h1>
                    <p className={styles["already-reg"]}>
                        "Cook-Blog" e SP приложение, създадено с React JS.
                        Има способността да извършва AJAX заявки към REST API също написан от мен.
                        За REST API са използвани Express.js, а за база данни - MongoDB, и върви на Node.js.
                        Ако имате препоръки или забележки, моля свържете се с мен на m.bogdanov9110@gmail.com
                    </p>
                    <div>
                        {/*button which closes the modal, when clicked */}
                        <input type="button" className={styles["show-more-less"]}
                            onClick={() => setIsOpen(false)}
                            value="затвори" />
                    </div>
                </div>

            </div>
        </>
    );
}