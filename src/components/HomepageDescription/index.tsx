import Translate from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

export default function HomepageDescription(): JSX.Element {
  return (
    <section className={styles.description}>
      <div className="container">
        <div className="row">
          <div className={clsx("col col--4", styles.hideMobile)}>
            <img
              src={useBaseUrl("/img/ts-logo-512.svg")}
              alt="Typescript Logo"
            />
          </div>
          <div className="col col--6">
            <p>
              <Translate
                id="homepage.description.hello"
                description="The label for hello there !"
              >
                Hello there 👋 !
              </Translate>
            </p>

            <p>
              <Translate
                id="homepage.description.me"
                description="The small text to describe me"
                values={{
                  name: <h2 className={styles.name}>Denis Souron</h2>,
                }}
              >
                {
                  "My name is {name}. I am a developer, casual blogger & co-host of Front-end chronicles podcast."
                }
              </Translate>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
