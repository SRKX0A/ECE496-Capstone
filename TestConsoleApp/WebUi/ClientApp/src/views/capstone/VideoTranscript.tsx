import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { axiosGet, axiosPost } from "../../common/API";
import LoadingPageComponent from "../../component/shared/LoadingPageComponent";
import download from "../../scripts/download";
import createBlob from "../../scripts/createBlob";
import { Button } from "react-bootstrap";

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

  const handleVideoUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }
    setVideoFilePath(URL.createObjectURL(input?.files[0]));
    setFile(input?.files[0]);
  };

  const editVideo = async () => {
    setShowNewVideo(true);
    setLoading(true);
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
      setLoading(false);
    } catch (e: any) {
      alert(e);
    }
  };

  const downloadVid = async () => {
    if (blob != null) download(blob, finalName);
  };


  return (
    <div className="card">
      <div className="card-header ">
        <div className="col-12 row">
            <div className="col-12 mb-2">
                <h2>Video Editor</h2>
            </div>
            <div className="col-6">
                <h3 className="">Instructions: </h3>
                <h4>1. Choose A File And Press Run</h4>
                <h4>2. Wait For Processing</h4>
                <h4>3. Download Result</h4>
            </div>
        </div>
        {loading == true && <LoadingPageComponent/>}
      </div>
      <div className="card-body row">
        <div className="col-6 row">
                <div className="col-6">
                    <h3>Input</h3>
                </div>
                <div className="col-6">
                    <input type="file" onChange={(e: any) => handleVideoUpload(e)} />
                </div>
        </div>
        <div className="col-6 row">
            <div className="col-6">
                <h3>Output</h3>
            </div>
            {finalName != "" && (
                    <button className="btn btn-dribbble float-end rounded-3" onClick={() => downloadVid()}>
                        <span>Download</span>
                        <FontAwesomeIcon icon="download" className="fs-3" />
                    </button>
                )}
        </div>
        <div className="col-6 mt-3">
          {videoFilePath != null && (
            <div>
              <ReactPlayer
                url={videoFilePath!}
                width="75%"
                height="25%"
                controls={true}
              />
              <button className="btn btn-info" onClick={() => editVideo()} disabled={videoFilePath == "videos/demo_video.MP4"}>
                <FontAwesomeIcon icon="play" type="button" />
                <span className="ms-2">Run</span>
              </button>
            </div>
          )}
        </div>
        <div className="col-6 mt-3">
            <div className="">
            <ReactPlayer
                url={newVideoFilePath!}
                width="75%"
                height="25%"
                controls={true}
            />
            </div>
        </div>
      </div>
    </div>
  );
}
