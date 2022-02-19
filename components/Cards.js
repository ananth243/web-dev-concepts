import React from "react";
import styles from "../styles/Card.module.css";

function Cards({ link, name, description }) {
  return (
    <div className={styles.container}>
      <a className={styles.card1} href={link}>
        <h3 className={styles.text}>{name}</h3>
        <div className={styles.hr} />
        <p className={styles.text}>{description}</p>
        <div className={styles.goCorner}>
          <div className={styles.goArrow}>→</div>
        </div>
      </a>
    </div>
  );
}

export default Cards;
