import React from "react";
import banner from "../../Images/banner.jpg";
import TypeWriter from "./Typewriter";
import styles from "./Bossbaby.module.css";

function Bossbaby() {
  const typeWriter = [
    "ML Developers",
    "Java Developers",
    "Data Analysts",
    "iOS Developers",
    "Software Developers",
  ];
  return (
    <div className={styles.bossbaby}>
      <div className={styles.parent}>
        <img className={styles.div1} src={banner} alt={"s"} />
        <div className={styles.div2}>
          <div className={styles.ftext}>
            Companies Inspiring <TypeWriter data={typeWriter} />{" "}
          </div>
        </div>
      </div>

      {/* <div className="box}>{generateCardsFromData(Data)}</div> */}
    </div>
  );
}

export default Bossbaby;
