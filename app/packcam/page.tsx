'use client'

import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Scanner } from "@yudiel/react-qr-scanner";
import ListCam from "../ui/packcam/video_list";

export default function Page() {
    const wcRef = useRef(null);
    const qr = useRef(null);
    const inputCode = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recording, setRecording] = useState(false);
    const recordRef = useRef(false);
    const [recordChunks, setRecordChunks] = useState([]);

    const recordChunkRef = useRef([]);

    const [mode, setMode] = useState("qr");
    const [uploading, setUploading] = useState(false);

    const [list, setList] = useState([]);
    const [listLoading, setListLoading] = useState(false);

    if (!listLoading) {
        setListLoading(true);
        fetch('http://localhost:8000/api/files', {method: "GET"})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setList(data['data']);
        })
        .catch(error => console.log(error))
        ;
    }


    useEffect(() => {
        window.addEventListener('keypress', e => {
            console.log(e.code, qr.current, mediaRecorderRef.current ? mediaRecorderRef.current.state : "not started");
            if (e.code == 'Space' && qr.current != "" && (!mediaRecorderRef.current || mediaRecorderRef.current.state == "inactive")) {
                handleStartVideoCapture();
            } else if (e.code == 'Space' && qr.current != "" && mediaRecorderRef.current.state == "recording") {
                handleStopVideoCapture();
            } else if (e.code.trim() == 'Enter' && qr.current != "" && mediaRecorderRef.current.state == "inactive") {
                doUpload();
            }
        })
    }, []);
    const doUpload = useCallback(async () => {
        console.log("handle upload to s3");

        // console.log(recordChunkRef.current.length);
        if (recordChunkRef.current.length > 0 && qr.current != "") {
            const blob = new Blob(recordChunkRef.current, { type: "video/webm" });
            const fileVideo = new File([blob], qr.current + ".webm");
            console.log(fileVideo);

            const formData = new FormData();
            formData.append("video", fileVideo);
            console.log(formData);
            if (!uploading) {
                setUploading(true);
                fetch("http://localhost:8000/api/uploads3", {
                    method: "POST",
                    body: formData,
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        alert(data['message']);
                        handleRestart();
                        setListLoading(false);
                    })
                    .catch(error => console.log(error))
                    .finally(() => setUploading(false));
            }

        }
    }, [recordChunkRef, qr]);

    const handleDataAvailable = useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordChunks(prev => prev.concat(data));
                recordChunkRef.current = recordChunkRef.current.concat(data);
            }
        },
        [recordChunkRef, setRecordChunks]
    );

    const handleScreenShot = useCallback(
        () => {
            const imageSrc = wcRef.current.getScreenshot();
            setScreenshot(imageSrc);
        },
        [wcRef]
    );

    const handleStartVideoCapture = useCallback(
        () => {
            setRecording(true);
            recordRef.current = true;
            mediaRecorderRef.current = new MediaRecorder(wcRef.current.stream, {
                mimeType: "video/webm"
            });
            mediaRecorderRef.current.addEventListener(
                "dataavailable", handleDataAvailable
            );

            mediaRecorderRef.current.start();
        }
        , [wcRef, setRecording, mediaRecorderRef, handleDataAvailable]);

    const handleStopVideoCapture = useCallback(() => {
        setRecording(false);
        recordRef.current = false;
        mediaRecorderRef.current.stop();
    }, [setRecording, mediaRecorderRef]);

    function handleRestart() {
        setMode("qr");
        setRecording(false);
        recordRef.current = false;
        setRecordChunks([]);
        recordChunkRef.current = [];
        qr.current = "";
        inputCode.current.value = "";
    }

    function CameraFunctions() {
        if (mode === "qr") {
            return null;
        }
        return (
            <>
                {/* <button className="border p-2" onClick={handleScreenShot}>Chụp</button> */}
                {recording ? null : <button className="border p-2 border p-2 text-white bg-green-700 rounded-lg" onClick={handleStartVideoCapture}>Space To Start</button>}
                {recording ? <button className="border p-2 border p-2 text-white bg-red-700 rounded-lg" onClick={handleStopVideoCapture}>Space To Stop</button> : null}
                {recordChunks.length ? <button className="border p-2 border p-2 text-white bg-orange-700 rounded-lg" onClick={doUpload}>Enter To Upload</button>
                    : null}
            </>
        );

    }

    function QrScanner() {
        return <Scanner onScan={(result) => {
            qr.current = result[0].rawValue;
            inputCode.current.value = qr.current;
            setMode("video");

        }} formats={["qr_code"]}
            allowMultiple={true}
            styles={{
                container: {
                    width: 600,
                },
            }}
            onError={(error) => {
                console.log(error);
            }}
        />
    }

    return (
        <div className="Container">
            <div className="mt-2 mb-2">
                <input placeholder="Mã Bưu Vận " className="p-2 border" type="text" name="qrCode" id="qrCode" ref={inputCode} />
                <span className="ms-2">
                    {qr.current == null || qr.current == ""
                        ? <span>Quét mã bưu vận để bắt đầu</span>
                        : <button className="border p-2 text-white bg-blue-700 rounded-lg" onClick={handleRestart} >Restart</button>}
                    <CameraFunctions />
                </span>
            </div>
            <div className="flex flex-row">
                <div className="">
                {mode == "qr" ?
                <QrScanner />
                :
                <Webcam
                    width="100%"
                    // height={600}
                    audio={false}
                    mirrored={false}
                    ref={wcRef}
                    screenshotFormat="image/jpeg"
                />}
                </div>
                <div className="ms-5">
                    <h2 className="">Các đơn hàng mới xong gần đây.</h2>
                    {<ListCam list={list} />}
                </div>
            </div>
            <div className="mt-2 mb-2">
                {/* {screenshot ? <img src={screenshot} alt="" /> : null} */}
            </div>

        </div>

    );

}