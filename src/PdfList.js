import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

function PdfList(props) {
  return (
    <>
      {props.files.length !== 0 && (
        <div className="container-fluid mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h1 className="text-center mb-5">All PDFs</h1>
              <div className="container">
                <table className="table  table-bordered text-center">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  {props.files.map((f) => (
                    <tbody>
                      <tr>
                        <td>{f?.file_name}</td>
                        <td>
                          <Link to="/pdfDetails" state={{ pdfUrl: f?.pdf_url }}>
                            view
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PdfList;
