import { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import styles from "../Browse/Browse.module.css";

export const ScrollButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true)
        }
        else if (scrolled <= 300) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <FaArrowCircleUp onClick={scrollToTop} className={styles["to-top"]}
            style={{ display: visible ? 'inline' : 'none' }} title="To top" />
    );
}