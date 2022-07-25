import { useContext, useState } from "react";
import { v4 } from "uuid";
import Resizer from "react-image-file-resizer";

import { storage } from "../../firebase/firebase-config";
import { ErrorContext } from "../../contexts/ErrorMessageContext";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject
} from "firebase/storage";

export const EditProfile = () => {

    const { errorMessage, setErrorMessage } = useContext(ErrorContext);
    const [img, setImg] = useState(null);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState(null);

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

    const handleFileUpload = async (e, file) => {
        e.preventDefault();
        if (!file) return;
        const image = await resizeFile(file);
        const imageName = image.name + v4();
        const storageRef = ref(storage, `gs://cook-blog-d3ed8.appspot.com/profilePics/${imageName}`);

        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            "state_changed",
            snapshot => {
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
                        setUrl({
                            url: url,
                            alt: imageName,
                        });
                        console.log(url);
                    });
            }
        );
    };

    const deleteObect = (url) => {

        const storageRef = ref(storage, url);
        deleteObject(storageRef, url)
            .then(() => alert('Picture deleted!'))
            .catch(error => {
                console.log(error.message);
            })
    };


    return (
        //TODO - MAKE THE FORM MATCH THE PROFILE MODEL!!!
        <>
            <form className="profile-edit-form" onSubmit={(e) => handleFileUpload(e, img)}>
                <div className="already-reg">
                    <input type="file" id="picture" onChange={(e) => e.target.files[0] && setImg(e.target.files[0])}
                        accept="image/x-png,image/gif, image/jpeg,image/jpg" />
                    <progress value={progress} max="100" /><p>{progress}{progress === 100 ? "% DONE!" : "%"}</p>
                    <div>
                        <p>

                        </p>
                    </div>
                    <input type="submit" value="създай" className="add-form-submit" />
                </div>
            </form>
            <button className="already-reg" onClick={deleteObect}></button>
        </>
    )
}

