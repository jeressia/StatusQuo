import React from "react";
import styles from "./QR.module.scss";

function QRView() {
  return (
    <div className={styles.qrView}>
      <img className={styles.qrCode} src="/sampleQR.svg" />
      <p>Share Status</p>
    </div>
  );
}

export default QRView;
