import { Fragment } from "react";

const Watermark = () => {
  const watermarkImageUrl = process.env.REACT_APP_WATERMARK;
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
          src={watermarkImageUrl}
          alt="Watermark"
        />
      </div>
    </Fragment>
  );
};

export default Watermark;
