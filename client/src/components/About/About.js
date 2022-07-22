import styles from './About.module.css'

export const About = ({ setIsOpen }) => {
    return (
        <>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
            <div className={styles.centered}>
                <div className="already-reg">
                    <h1 className="already-reg">Относно <span>"Cook-blog by Martin Bogdanov"</span></h1>
                    <p className="about-text">
                        "Cook-Blog" e SP приложение, създадено с React JS.
                        Има способността да извършва CRUD операции чрез AJAX заявки към REST API написан от мен.
                        REST API e писан с Express.js и върви на Node.js
                    </p>
                    <p className="about-text">
                        Надявам се, да ви хареса това малко приложение, ако имате препоръки или забележки, моля <strong>свържете се</strong> с мен на
                        <span> <strong>m.bogdanov9110@gmail.com</strong></span>
                    </p>
                    <div>
                        {/*button which closes the modal, when clicked */}
                        <input type="button" className="show-more-less "
                            onClick={() => setIsOpen(false)}
                            value="затвори" />
                    </div>
                </div>

            </div>
        </>
    );
}