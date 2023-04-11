import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { axiosGet, axiosPost } from "../../common/API";
import LoadingPageComponent from "../../component/shared/LoadingPageComponent";
import download from "../../scripts/download";
import createBlob from "../../scripts/createBlob";
import { Button } from "react-bootstrap";
import { TimeStamp } from "../../common/store";

export default function () {
  const [videoFilePath, setVideoFilePath] = useState<any | null>(
    "videos/demo_video.MP4"
  );
  const [newVideoFilePath, setNewVideoFilePath] = useState<any | null>(
    "videos/demo_video.MP4"
  );

  const [file, setFile] = useState<any>(null);
  const [showNewVideo, setShowNewVideo] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);
  const [blob, setblob] = useState<Blob | null>(null);
  const [finalName, setFinalName] = useState<string>("");
  const [transcript, setTranscript] = useState<string>("")
  const [timeStamps, setTimeStamps] = useState<TimeStamp[]>([])

  const [section , setSection] = useState<string>("Media")

  const handleVideoUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    setVideoFilePath(URL.createObjectURL(input?.files[0]));
    setFile(input?.files[0]);
    console.log (input?.files[0])
  };

  const editVideo = async () => {
    setShowNewVideo(true);
    setLoading(true);
    setSection("Media")
    setTranscript("")
    setTimeStamps([])
    setNewVideoFilePath("videos/demo_video.MP4")
    const formdata = new FormData();
    formdata.append("file", file);
    try {
      const response = await axiosPost("/api/EditVideo", formdata);
      console.log(response);
      setblob(createBlob(response.data.bytes, response.data.type));
      setNewVideoFilePath(
        URL.createObjectURL(createBlob(response.data.bytes, response.data.type))
      );
      setFinalName(response.data.name);
      setTranscript(response.data.transcript)
      setTimeStamps(response.data.timeStampList)
      setLoading(false);
    } catch (e: any) {
      alert(e);
      setLoading(false);
    }
  };

  const downloadVid = async () => {
    if (blob != null) download(blob, finalName);
  };


  return (
    <div className="card" style={{background:"linear-gradient(to top, rgba(255, 241, 235, 0.2), rgba(172, 224, 249, 0.2))"}}>
      <div className="card-header " style={{background: "none"}}>
        <div className="col-12 row">
            <div className="col-12 mb-2">
                <FontAwesomeIcon icon="clapperboard" className="fs-3" />
                <h2 className="d-inline ms-2" >Automatic Audio/Video Content Editing </h2>
            </div>
            <div className="col-6">
                <h3 className="">Instructions: </h3>
                <h4 className="">1. Choose A File (.wav/.mp4) And Press Run</h4>
                <h4 className="">2. Wait For Processing</h4>
                <h4 className="">3. Download Result</h4>
            </div>
        </div>
        {loading == true && <LoadingPageComponent text={"Processing Data"}/>}
      </div>
      <div className="card-body " >
        <div className="row">
          <div className="col-6 row">
                  <div className="col-6">
                    <FontAwesomeIcon icon="film" className="fs-3" />
                      <h3 className="d-inline ms-2">Input</h3>
                  </div>
                  <div className="col-6">
                      {<input disabled={loading == true} type="file" onChange={(e: any) => handleVideoUpload(e)} />}
                  </div>
          </div>
          <div className="col-6 row">
              <div className="col-6">
                  <FontAwesomeIcon icon="photo-film" className="fs-3" />
                  <h3 className="d-inline ms-2">Output</h3>
              </div>
              <div className="col-6">
                {finalName != "" && loading != true && (
                        <button className="btn btn-dribbble float-end rounded-3" onClick={() => downloadVid()}>
                            <span>Download </span>
                            <FontAwesomeIcon icon="download" className="fs-3" />
                        </button>
                    )}
              </div>
          </div>
          <div className="col-6 mt-3 row h-100">
            <div className="tab">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <a onClick={() => setSection("Media")} className={`nav-link ${section == "Media" ? "active text-white bg-info" : ""}`} 
                  data-bs-toggle="tab" role="tab" aria-selected="true">Video/Audio</a>
                </li>
                {transcript != "" && <li className="nav-item" role="presentation">
                  <a onClick={() => setSection("Transcript")} className={`nav-link ${section == "Transcript" ? "active text-white bg-info" : ""}`} 
                    data-bs-toggle="tab" role="tab" aria-selected="false" >Transcript</a>
                </li>}
                {timeStamps.length != 0 && <li className="nav-item" role="presentation">
                  <a  onClick={() => setSection("Timestamps")} className={`nav-link ${section == "Timestamps" ? "active text-white bg-info" : ""}`}  
                data-bs-toggle="tab" role="tab" aria-selected="false">TimeStamps</a>
                </li>}

              </ul>
              <div className="tab-content ps-0 shadow-none h-100" style={{background:"none"}}>
                <div className={`tab-pane  h-100 ${section == "Media" ? "active" : ""}` } >
                  {videoFilePath != null && (
                    <div >
                      <ReactPlayer
                        url={videoFilePath!}
                        width="75%"
                        height="350px"
                        controls={true}
                      />
                      <button className="btn btn-info mt-3" onClick={() => editVideo()} disabled={videoFilePath == "videos/demo_video.MP4"}>
                        <FontAwesomeIcon icon="play" type="button" />
                        <span className="ms-2">Run</span>
                      </button>
                    </div>
                  )}
                </div>
                <div style={{maxHeight: "350px"}} className={`tab-pane h-100  overflow-auto  ${section == "Transcript" ? "active border border-2 p-2" : ""}`}>
                    <p className="fs-4">
                      {transcript}
                    </p>
                </div>
                <div style={{maxHeight: "350px"}} className={`tab-pane h-100  overflow-auto ${section == "Timestamps" ? "active border border-2 py-2" : ""}`}>
                  <table className="my-0 table mt-3">
                      <thead>
                          <tr>
                              <th></th>
                              <th  className="d-table-cell col-2 h5">{`Word`}</th>
                              <th className="d-table-cell col-2 h5">{`Confidence`}</th>
                              <th className="d-table-cell col-2 h5">{`StartTime(s)`}</th>
                              <th className="d-table-cell col-2 h5">{`EndTime(s)`}</th>
                              <th className="d-table-cell col-2 h5">{`Duration(s)`}</th>
                          </tr>
                      </thead>
                      <tbody>
                          {timeStamps.map((e: TimeStamp) => (
                              <tr className="">
                                  <td></td>
                                  <td className="d-xl-table-cell"><h5>{e.word}</h5></td>
                                  <td className="d-xl-table-cell"><h5>{e.confidence}</h5></td>
                                  <td className="d-xl-table-cell"><h5>{e.startTime}</h5></td>
                                  <td className="d-xl-table-cell"><h5>{e.endTime}</h5></td>
                                  <td className="d-xl-table-cell"><h5>{e.duration}</h5></td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6 mt-3 row h-100">
              <div className="tab">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a  className={`nav-link active text-white bg-success `} href="#tab-1" data-bs-toggle="tab" role="tab" aria-selected="true">Video/Audio</a>
                  </li>
                </ul>
                <div className="tab-content h-100  ps-0 shadow-none"  style={{background:"none"}}>
                    <div className="tab-pane active h-100">
                      <div className="">
                        <ReactPlayer
                            url={newVideoFilePath!}
                            width="75%"
                            height="350px"
                            controls={true}
                        />
                      </div>
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
