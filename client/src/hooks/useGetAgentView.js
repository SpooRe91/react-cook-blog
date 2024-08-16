import { useEffect, useState } from "react";

const MOBILE_TRESHHOLD = 768;
const MID_TRESHHOLD = 900;

const useGetAgentView = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const isMobile = MOBILE_TRESHHOLD > windowWidth;
    const isBelowMidScreenSize = MID_TRESHHOLD > windowWidth;
    return { isBelowMidScreenSize, isMobile };
};

export default useGetAgentView;
