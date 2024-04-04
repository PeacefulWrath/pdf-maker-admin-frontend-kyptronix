import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import PdfList from "./PdfList";

export default function CreatePdf() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);
  const [disableUploadBtn, setDisableUploadBtn] = useState(true);

  const saveFile = async (formData) => {
    let fileData = {};
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   console.log("ll", response);
      fileData = response;
    } catch (error) {
      console.log("err", error);
    } finally {
      return fileData;
    }
  };

  const convertFile = async (formData) => {
    let convertedMessage = {};
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/convert`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      //   console.log("ll", response);
      convertedMessage = response.data.message;
      console.log(convertedMessage)
    } catch (error) {
      console.log("err", error);
    } finally {
      return convertedMessage;
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile 
      && (selectedFile.type === "application/pdf"||selectedFile.type  === "docx" || selectedFile.type  === "pptx" || selectedFile.type  === "XLSX")
      ) {
      setDisableUploadBtn(false);
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("Please choose a valid PDF file");
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    console.log("fff", file.name.split(".")[1]);
    const fileType = file.name.split(".")[1];
    if (fileType === "docx" || fileType === "pptx" || fileType === "XLSX") {
      const convertedData = await convertFile(formData);

      if (convertedData !== "file converted successfully") {
        alert("file conversion failed");
        return;
      }
    }
    const insertedData = await saveFile(formData);
    if (insertedData) {
      alert("pdf uploaded successfully");
      window.location.reload();
    } else {
      alert("pdf upload failed");
    }
  };

  useEffect(() => {
    const fetcher = async () => {
      let filesData = [];
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/`
        );
        filesData = response.data;
        // console.log("fff", filesData);
      } catch (error) {
        console.log("err", error);
      } finally {
        setFiles([...filesData]);
      }
    };

    fetcher();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1 className="d-flex justify-content-center align-items-center mb-5">
          PDF Maker
        </h1>
        <div
          className="d-flex justify-content-center align-items-center mb-5"
          style={{ marginLeft: "130px" }}
        >
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <button
            className="btn"
            style={{ backgroundColor: "green", color: "white" }}
            onClick={handleUpload}
            disabled={disableUploadBtn}
          >
            Upload
          </button>
        </div>
        {error && (
          <div className="d-flex justify-content-center align-items-center">
            <p style={{ color: "red", marginTop: "23px", marginLeft: "5px" }}>
              {error}
            </p>
          </div>
        )}
      </div>
      {files.length !== 0 ? (
        <PdfList files={files} />
      ) : (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="spinner-border" role="status"></div>
        </div>
      )}
    </>
  );
}
