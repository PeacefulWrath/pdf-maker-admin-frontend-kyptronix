import { Fragment } from "react";

const Watermark = () => {
  return (
    <Fragment>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(-45deg)",
          opacity: 0.5,
        }}
      >
        <img
          src="https://e7.pngegg.com/pngimages/640/199/png-clipart-javascript-logo-html-javascript-logo-angle-text-thumbnail.png"
          alt="Watermark"
        />
      </div>
    </Fragment>
  );
};

export default Watermark;
