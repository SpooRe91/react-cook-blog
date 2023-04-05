import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";

export const Homepage = () => {
    //-------------------------------------------------------------------------------------------------
    return (
        <>
            <title>Начало</title>
            <section className={styles["landing-page-article"]}>
                <div>
                    <article className={styles["landing-page-section"]}>
                        <h1 className={styles["landing-page-header"]}>Welcome to Cook-Blog</h1>
                        <h3 className={styles["landing-page-header"]}>Your favourite meal awaits YOU!</h3>
                    </article>
                </div>
            </section>
            <div className={styles['second-header']}>
                <section className={styles["landing-page-section1"]}>

                    <article>
                        <h4 className={styles["landing-page-header1"]}>
                            Here you can browse different recipes and share your own
                        </h4>
                        <h4 className={styles["landing-page-header1"]}>
                            Checkout the newest recipes over <Link to="recipe/browse">here</Link>
                        </h4>
                    </article>

                </section>

                <section className={styles["landing-page-section1"]}>
                    <article>
                        <h4 className={styles["landing-page-header1"]}>
                            So hop on, and explore the culinary world
                        </h4>
                        <h4 className={styles["landing-page-header1"]}>
                            You can register from <Link to="auth/register">here</Link> or
                            login from <Link to="auth/login">here</Link>
                        </h4>
                    </article>
                </section>

                <section className={styles["landing-page-section1"]}>
                    <article>
                        <h4 className={styles["landing-page-header1"]}>
                            All you need to do is register and start
                        </h4>

                        <h4 className={styles["landing-page-header1"]}>
                            We also have a macronutrients table, right <Link to="auth/register">here</Link>
                        </h4>
                    </article>
                </section>
            </div>
        </>
    );
}