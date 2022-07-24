// import { storage } from "../../firebase/firebase-config";
// import { v4 } from "uuid";
// import Resizer from "react-image-file-resizer";
// import {
//     ref,
//     uploadBytesResumable,
//     getDownloadURL,
//     StorageError
// } from "firebase/storage";

// import { useContext, useEffect, useState } from "react";
// import { ErrorContext } from "../../contexts/ErrorMessageContext";

// export const EditProfile = () => {


//     const { errorMessage, setErrorMessage } = useContext(ErrorContext);
//     const [img, setImg] = useState(null);
//     const [progress, setProgress] = useState(null);
//     const [url, setUrl] = useState(null);
//     const [file, setFile] = useState(null);

//     const resizeFile = (file) =>
//         new Promise((resolve) => {
//             Resizer.imageFileResizer(
//                 file,
//                 1240,
//                 1240,
//                 "JPEG",
//                 100,
//                 0,
//                 (uri) => {
//                     resolve(uri);
//                 },
//                 "file"
//             );
//         });


//     function useFileUplaod(file, parentFolder) {

//         useEffect(() => {
//             (async () => {
//                 if (!file) return;

//                 const image = await resizeFile(file);
//                 const imageName = image.name + v4();
//                 const storageRef = ref(storage, `profilePics/${imageName}`);

//                 const uploadTask = uploadBytesResumable(storageRef, image);
//                 uploadTask.on(
//                     "state_changed",
//                     (snapshot) => {
//                         const prc = Math.round(
//                             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//                         );
//                         setProgress(prc);
//                     },
//                     (error) => {
//                         return setErrorMessage(error)
//                     },
//                     () => {
//                         getDownloadURL(storageRef)
//                             .then((url) => {
//                                 setUrl({
//                                     url: url,
//                                     alt: imageName,
//                                 });
//                             })
//                             .catch((error) => {
//                                 setErrorMessage(error.message)
//                             })
//                     }
//                 )

//             })()
//         }, [file, parentFolder]);
//         return { progress, errorMessage, url, setUrl }
//     }

//     const { returnedUrl, error, returnedProgress, returedSetUrl } = useFileUplaod(img, 'profilePics');

//     const submitHandler = async (e, data) => {
//         e.preventDefault();
//         let payload = data;
//         if (url) payload.img = url;
//         try {
//             await updateSingleDocumentWithDocId("")
//         } catch (error) {
//             setErrorMessage(error.message)
//         }

//     }

//     return (
//         <form className="add-form" method="POST" onSubmit={submitHandler}>
//             <div className="already-reg">
//                 <input type="file" id="picture" onChange={(e) => { setImg(e.target.files[0]) }}
//                     accept="image/x-png,image/gif, image/jpeg,image/jpg" />
//                 <div>
//                     <p>
//                         {progress > 0 && progress < 100 &&
//                             `качва се...${progress}`
//                         }
//                     </p>
//                 </div>
//                 <input type="submit" value="създай" className="add-form-submit" />
//             </div>
//             {/* <div className="already-reg">
//                 <label htmlFor="name">име</label>
//                 <input type="text" name="name" id="name" onChange={changeHandler}
//                     placeholder="някакво име..." required value={values.name} />
//             </div> */}

//         </form>
//     )
// }

