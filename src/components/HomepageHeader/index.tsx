import Translate from "@docusaurus/Translate";
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
        <p className="hero__subtitle">
          <Translate id="homepage.tagline" description="The homepage tagline">
            The Rebel Alliance's blog vs. the Microservice Empire
          </Translate>
        </p>
      </div>
      <Vaporwave />
    </header>
  );
}
