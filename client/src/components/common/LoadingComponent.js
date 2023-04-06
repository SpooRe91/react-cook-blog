import React from 'react'
import styles from "./Common.module.css";
import { BeatLoader } from 'react-spinners';

const LoadingComponent = ({ isLoading }) => {
    return (
        <div className={styles["already-reg-loading"]}>
            <BeatLoader loading={() => isLoading} color={"white"} />
            <p>Моля изчакайте...</p>
        </div>
    )
}

export default LoadingComponent