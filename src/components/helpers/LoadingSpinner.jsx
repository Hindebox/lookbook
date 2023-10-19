import "../../assets/style/global.scss";

import loadingSpin from "../../assets/images/loading.gif";

export default function LoadingSpinner() {
  return (
    <>
      <div
        className="loadingContainer"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img src={loadingSpin} style={{ width: "100px" }} />
      </div>
    </>
  );
}
