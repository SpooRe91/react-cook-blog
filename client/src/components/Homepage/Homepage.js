import styles from "./Homepage.module.css";

export const Homepage = () => {
    //-------------------------------------------------------------------------------------------------
    return (
        <>
            <title>Начало</title>
            <article className={styles["landing-page-article"]}>
                <div>
                    <section className={styles["landing-page-section"]}>
                        <h1 className={styles["landing-page-header"]}><i>Welcome to Cook-Blog</i></h1>
                        <h3 className={styles["landing-page-header"]}><i>Your favourite meal awaits YOU!</i></h3>
                    </section>
                </div>
            </article>
        </>
    );
}