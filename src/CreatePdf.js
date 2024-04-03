import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import PdfList from "./PdfList";

export default function CreatePdf() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
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
            style={{ backgroundColor: "green" }}
            onClick={handleUpload}
          >
            Upload
          </button>
          {error && (
            <p style={{ color: "red", marginTop: "23px", marginLeft: "5px" }}>
              {error}
            </p>
          )}
        </div>
      </div>
      {files.length !== 0 && <PdfList files={files} />}
    </>
  );
}
