import React from "react";
import styles from "../styles/Card.module.css";
import Link from "next/link";

function Cards({ link, name, description }) {
  return (
    <div className={styles.container}>
      <Link href={link} passHref>
        <button className={styles.card1} href={link}>
          <h3 className="text-black">{name}</h3>
          <p className={styles.small}>{description}</p>
          <div className={styles.goCorner}>
            <div className={styles.goArrow}>→</div>
          </div>
        </button>
      </Link>
    </div>
  );
}

export default Cards;
