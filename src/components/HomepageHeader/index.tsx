import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React from "react";
import Vaporwave from "../Vaporwave";
import styles from "./styles.module.css";

export default function HomepageHeader(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
      <Vaporwave />
    </header>
  );
}
