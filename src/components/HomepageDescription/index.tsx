import Head from "@docusaurus/Head";
import { useColorMode } from "@docusaurus/theme-common";
import Translate, { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useIsBrowser from "@docusaurus/useIsBrowser";
import React from "react";
import styles from "./styles.module.css";

export default function HomepageDescription(): JSX.Element {
  const { colorMode } = useColorMode();
  const isBrowser = useIsBrowser();
  const logosImgUrl =
    isBrowser && colorMode === "light"
      ? "/img/home/logos-light.webp"
      : "/img/home/logos-dark.webp";

  return (
    <section className={styles.description}>
      <div className="container">
        <div className="row row--reverse">
          <div className="col col--6 col--reverse-offset-2 padding-bottom--lg">
            <p>
              <Translate
                id="homepage.description.hello"
                description="The label for hello there !"
              >
                Hello there 👋 !
              </Translate>
            </p>

            <div>
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
            </div>
          </div>
          <div className="col col--4">
            <Head>
              <link
                rel="preload"
                href={useBaseUrl(logosImgUrl)}
                as="image"
                media="(min-width: 997px)"
              />
            </Head>
            <img
              src={useBaseUrl(logosImgUrl)}
              className={styles.fullHeight}
              height="410"
              width="410"
              alt={translate({
                id: "homepage.description.logosAlt",
                message:
                  "Multiple logos combined together. Logos displayed are Angular, Javascript, React, VueJS, Typescript and Visual Studio Code.",
                description: "Alternative description for logos in homepage",
              })}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
