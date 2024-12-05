
// import { useCallback, useEffect, useState } from 'react';

// const BtnDownload = ({ recordChunkRef, qr, mediaRecorderRef }) => {
//     const [uploading, setUploading] = useState(false);

//     useEffect(() => {
//         window.addEventListener('keypress', e => {
//             if (e.code.trim() == 'Enter' && qr.current != "" && mediaRecorderRef.current.state == "inactive") {
//                 console.log("handle download");
//                 doUpload();
//             }
//         })
//     }, [mediaRecorderRef, qr]);

//     const doUpload = useCallback(async () => {
//     console.log(recordChunkRef.current.length);
//         if (recordChunkRef.current.length > 0 && qr.current != "") {
//             const blob = new Blob(recordChunkRef.current, { type: "video/webm" });
//             const fileVideo = new File([blob], qr.current + ".webm");

//             const formData = new FormData();
//             formData.append("video", fileVideo);
//             if (!uploading) {
//                 setUploading(true);
//                 fetch("http://localhost:8000/api/uploads3", {
//                     method: "POST",
//                     body: formData,
//                 })
//                     .then(response => response.json())
//                     .then(data => console.log(data))
//                     .catch(error => console.log(error))
//                     .finally(() => setUploading(false));
//             }

//         }
//     }, [recordChunkRef, qr]);

//     return (
//         <>
//             <button className="border p-2 border p-2 text-white bg-orange-700 rounded-lg" onClick={doUpload}>Enter To Upload</button>
//         </>
//     );

// }

// export default BtnDownload;