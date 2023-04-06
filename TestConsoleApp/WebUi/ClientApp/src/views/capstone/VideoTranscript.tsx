import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { axiosGet } from "../../common/API";
import LoadingPageComponent from "../../component/shared/LoadingPageComponent";


export default function() {

    const [videoFilePath, setVideoFilePath] = useState<any | null>("C:\\Capstone\\TestVideo.mp4");
    const [file, setFile] = useState<any>(null)
    const [transcript, setTranscript] = useState<string| null | any>(null)
    const [showTranscript, setShowTranscript] = useState<boolean>(false)

    const handleVideoUpload = (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) {
            return;
        }
        setVideoFilePath(URL.createObjectURL(input?.files[0]));
        setFile(input?.files[0])
    };

    const getTranscript = async() => {
        setShowTranscript(true)
        setTranscript(null)
        try{
            const response = await axiosGet("/api/GetTranscript")
            setTranscript(response.data)
            console.log(response)
        }
        catch (e: any){ 
        }
    }

    useEffect(() => {
        console.log(videoFilePath)
        console.log(file)
    }, [videoFilePath])

    return (
        <div className="card">
            <div className="card-header">
                <h4>Video</h4>
            </div>
            <div className="card-body row" style={{maxHeight: "500px"}}>
                <div className="col-12">
                    <input type="file" onChange={(e:any) => handleVideoUpload(e)} />
                </div>
                <div className="col-6 mt-3">
                    {videoFilePath != null && 
                    <div>
                        <ReactPlayer url={videoFilePath!} width="75%" height="25%" controls={true} />
                        <button className="btn btn-info" onClick={() => getTranscript()}>
                            <FontAwesomeIcon icon="play"  type="button" />
                           <span className="ms-2">Run</span>
                        </button>
                    </div>
                    }   
                </div>
                {
                    showTranscript != false &&
                    <div className="col-6">
                        {
                            transcript != null &&
                            <div className="card-body">
                                <p>{`${transcript}`}</p>
                            </div>
                        }
                        {
                            transcript == null && <LoadingPageComponent />
                        }
                    </div>
                }
            </div>
        </div>
    )
}