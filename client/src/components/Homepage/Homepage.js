import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import useGetAgentView from "./../../hooks/useGetAgentView";

export const Homepage = () => {
    const { isMobile } = useGetAgentView();

    return (
        <>
            <title>Начало</title>
            <section className={styles["landing-page-article"]}>
                <div className={styles["first-header"]}>
                    <h1 className={styles[!isMobile ? "landing-page-header" : "landing-page-header-mobile"]}>
                        Welcome to Cook-Blog
                    </h1>
                    <h3 className={styles[!isMobile ? "landing-page-header" : "landing-page-header-mobile"]}>
                        Your favourite meal awaits YOU!
                    </h3>
                </div>
                <div className={styles["second-header"]}>
                    <div className={styles["second-header-card"]}>
                        <h4
                            className={
                                styles[!isMobile ? "landing-page-header1" : "landing-page-header1-mobile"]
                            }
                        >
                            Here you can browse different recipes and share your own
                        </h4>
                    </div>
                    <div className={styles["second-header-card"]}>
                        <h4
                            className={
                                styles[!isMobile ? "landing-page-header1" : "landing-page-header1-mobile"]
                            }
                        >
                            Checkout the newest recipes over <Link to="recipe/browse">here</Link>
                        </h4>
                    </div>
                    <div className={styles["second-header-card"]}>
                        <h4
                            className={
                                styles[!isMobile ? "landing-page-header1" : "landing-page-header1-mobile"]
                            }
                        >
                            So hop on, and explore the culinary world
                        </h4>
                    </div>
                    <div className={styles["second-header-card"]}>
                        <h4
                            className={
                                styles[!isMobile ? "landing-page-header1" : "landing-page-header1-mobile"]
                            }
                        >
                            You can register from <Link to="auth/register">here</Link> or login from{" "}
                            <Link to="auth/login">here</Link>
                        </h4>
                    </div>
                    <div className={styles["second-header-card"]}>
                        <h4
                            className={
                                styles[!isMobile ? "landing-page-header1" : "landing-page-header1-mobile"]
                            }
                        >
                            All you need to do is register and start
                        </h4>
                    </div>
                    <div className={styles["second-header-card"]}>
                        <h4
                            className={
                                styles[!isMobile ? "landing-page-header1" : "landing-page-header1-mobile"]
                            }
                        >
                            We also have a macronutrients table, right <Link to="recipe/macros">here</Link>
                        </h4>
                    </div>
                </div>
            </section>
        </>
    );
};
