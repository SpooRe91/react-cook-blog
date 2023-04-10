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
                        Казвам се Мартин, и съм Junior Full-stack JavaScript Web developer.
                        По-долу, можете да намерите линк към моята GitHub страница, в нея има различни започнати, готови или в процес на довършване, проетки.
                        Също така, можете да се свържете с мен чрез e-mail на: m.bogdanov9110@gmail.com
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