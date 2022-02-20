import React from "react";
import styles from "../styles/Card.module.css";
import Link from "next/link";

function Cards({ id, link, name, description }) {
  return (
    <div className={styles.container}>
      <Link href={link} passHref>
        <button className={styles.card1}>
          <h3 className={styles.text}>{name}</h3>
          <div className={styles.hr} />
          <p className={styles.text}>{description}</p>
          <div className={styles.goCorner}>
            <div className={styles.goArrow}>→</div>
          </div>
        </button>
      </Link>
    </div>
  );
}

export default Cards;
