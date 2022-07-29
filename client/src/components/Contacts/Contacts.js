import styles from "./Contacts.module.css"

export const Contacts = ({ setIsOpen }) => {

    return (
        <>
            <div className={styles["dark-bg"]} onClick={() => setIsOpen(false)} />
            <div className={styles["centered"]}>
                <div className={styles["already-reg"]}>

                    <h1 className={["already-reg"]}>Контакти и кратка биография</h1>

                    <h3 className={["already-reg"]}>Martin Bogdanov</h3>
                    <p className={["already-reg"]}>
                        Казвам се Мартин, аз съм бивш професионален готвач и по настоящем учащ се софтуерен инженер.
                        По-долу, можете да намерите линк към моята GitHub страница, където има най-различни започнати, готови или проекти в процес на разработка.
                    </p>
                    <p className={["already-reg"]}>
                        Също така, можете да се свържете с мен чрез e-mail на:<strong>m.bogdanov9110@gmail.com</strong>
                    </p>
                    <h4>Линк към GitHub:<a href="https://github.com/SpooRe91" target={"_blank"} rel="noreferrer">ТУК</a></h4>
                    <div>
                        {/*button which closes the modal, when clicked */}
                        <input type="button" className={styles["show-more-less"]}
                            onClick={() => setIsOpen(false)}
                            value="затвори" />
                    </div>
                </div >
            </div >
        </>
    );
}