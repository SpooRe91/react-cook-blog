import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import Resizer from "react-image-file-resizer";


import { storage } from "../../firebase/firebase-config";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";

import { ErrorContext } from "../../contexts/ErrorMessageContext";
import { LoggedUserContext } from "../../contexts/LoggedUserContext";

import { editUserImage } from "../../services/userService";
import { MealContainer } from "../MyRecipes/MealContainer";

import dummyPic from "./dummy-profile-pic.jpg";
import styles from "./Profile.module.css";
import { ScrollButton } from "../common/ScrollButton";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useProfile } from "../../customHooks/useMyProfile";
import { useOwnMeals } from "../../customHooks/useOwnMeals";

export const Profile = ({ isLoading, setIsLoading }) => {

    const { user } = useContext(LoggedUserContext);
    const { errorMessage, setErrorMessage } = useContext(ErrorContext);
    const { id } = useParams();
    console.log(id);
    const [img, setImg] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [notDeleted, setNotDeleted] = useState([])
    const [toUpdate, setToUpdate] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    const controller = new AbortController();
    const { signal } = controller;
    //UPLOAD THE IMAGE, ONCE THE FILE IS SELECTED-------------------------------------------------------------------------
    useEffect(() => {
        const uploadImg = async (img) => {
            if (!img) return;
            const image = await resizeFile(img);
            const imageName = image.name + v4();
            const storageRef = ref(storage, `gs://cook-blog-d3ed8.appspot.com/profilePics/${user?.email}/${imageName}`);

            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress)
                },
                error => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(storageRef)
                        .then((url) => {
                            setUrl(url);
                        })
                        .catch((error) => {
                            setErrorMessage(error.message);
                            console.log(error.message);
                        })
                }
            );
        };
        uploadImg(img);
    }, [img, setErrorMessage, user?.email]);

    const { getUserProfile, loading } = useProfile(id);
    const { getAllOwnMeals } = useOwnMeals();

    //GET THE CURRENT USER-------------------------------------------------------------------------
    //GET THE CURRENT USER'S PUBLICATIONS-------------------------------------------------------------------------

    useEffect(() => {
        setIsLoading(state => true);

        getUserProfile()
            .then((res) => {
                setUserProfile(res);
                setIsLoading(state => loading);
            })
            .catch(error => {
                console.log(error.message);
                setErrorMessage(error.message);
            });

        getAllOwnMeals(signal, controller)
            .then((res) => {
                if (res.length > 0) {
                    setNotDeleted(res.filter(x => x.isDeleted !== true));
                    setIsLoading(state => loading);
                }
            })
            .catch(error => {
                if (controller.signal.aborted) { return }
                console.log(error.message);
                setErrorMessage(error.message);
            })
        return () => {
            setErrorMessage('');
            controller.abort();
        }
    }, [loading, setErrorMessage, setIsLoading]);


    //RESIZE THE IMAGE-------------------------------------------------------------------------

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                1240,
                1240,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });

    //submit the url to the back-end, setThe img to null, set the updateState(so the chose file buttons appears and set progress bar to 0)------------
    const editHandler = () => {
        if (url) {
            editUserImage(url, user?.id)
                .then(res => {
                    setImg(null);
                    setToUpdate(false);
                    setProgress(0);
                    if (res.message) throw new Error(res.message);
                })
                .catch(error => {
                    console.log(error.message);
                    setErrorMessage(error.message);
                })
        }
    }

    return (
        <>
            <title>Profile</title>

            <div className={styles["profile"]}>
                {
                    isLoading
                        ?
                        <div className={styles["already-reg"]}>
                            <BeatLoader loading={() => isLoading} color={"white"} />
                            <p>Вашият профил се зарежда, моля изчакайте... </p>
                        </div>
                        :
                        <div className={styles["profile-containter"]}>

                            <a href={!userProfile?.image ? dummyPic : userProfile.image} target="_blank" rel="noreferrer">
                                <img className={styles["profile-image-link"]} src={!userProfile?.image ? dummyPic : userProfile.image} id="profile-photo" alt="" />
                            </a>
                            <p className={styles["change-pic-text"]}>{'ПРОМЯНА НА СНИМКА'}

                                {
                                    !img
                                        ?
                                        <button className={styles["btn"]} onClick={() => setToUpdate(state => !state)}
                                            style={{ "color": "red" }}>
                                            Избери снимка
                                        </button>
                                        :
                                        progress === 100
                                            ?
                                            <button className={styles["btn"]} onClick={() => editHandler()}
                                                style={{ "color": "green", "textShadow": "white 0px 0px 20px" }} >
                                                Качи снимка
                                            </button>
                                            : null
                                }
                            </p>
                            {
                                //indicates whether the button for image uplaod is clicked, so the browse button and progress bad can appear
                                toUpdate
                                    ?
                                    <div style={{ "display": "block" }}>
                                        <input type="file" id="picture" name="смени снимка" onChange={(e) => [e.target.files[0], setImg(e.target.files[0])]}
                                            accept="image/x-png,image/gif, image/jpeg, image/jpg" />

                                        <progress value={progress} max="100" style={progress === 100 ? { "display": "none" } : { "display": "block" }} />
                                        <p style={progress === 100 ? { "display": "none" } : { "display": "block" }}> {progress}{progress === 100 ? "% DONE!" : "%"}
                                        </p>
                                    </div>
                                    :
                                    ""
                            }
                            < div >

                                <article>
                                    <p className={styles["recipe-diff-count"]} style={{ "color": "wheat" }}><strong>вашият email: </strong>
                                        <span style={{ "color": "white" }}>
                                            {userProfile?.email}
                                        </span>
                                    </p>

                                    <p className={styles["recipe-diff-count"]} style={{ "color": "wheat" }}><strong>вашите публикации:</strong></p>
                                    <div className={styles["profile-publications-container"]}>
                                        {
                                            notDeleted.length > 0
                                                ?
                                                notDeleted.map(meal =>
                                                    <MealContainer key={meal._id} {...meal}
                                                        timesLiked={meal.likes} user={user}
                                                        setErrorMessage={setErrorMessage} errorMessage={errorMessage} />)
                                                :
                                                <>
                                                    <p className={styles["recipe-diff-count"]} style={{ "color": "red" }}><strong>Все още нямате публикации!</strong></p>
                                                    <p className={styles["recipe-diff-count"]}> Създайте нова от<Link to="/recipe/add" className={styles["recipe-diff-count"]} style={{ "color": "white" }}>ТУК</Link></p>

                                                </>
                                        }
                                    </div>
                                </article>
                            </div>
                        </div>
                }
            </div>
            <ScrollButton />
        </>
    )
}

