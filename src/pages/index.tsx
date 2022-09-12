import Head from "@docusaurus/Head";
import { translate } from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import HomepageDescription from "@site/src/components/HomepageDescription";
import Layout from "@theme/Layout";
import React from "react";
import HomepageHeader from "../components/HomepageHeader";

export default function Home(): JSX.Element {
  return (
    <Layout
      title={translate({
        id: "homepage.meta.title",
        message: "Welcome aboard the Nebulon",
        description: "The title for homepage",
      })}
      description={translate({
        id: "homepage.meta.description",
        message:
          "The Rebel Alliance's blog vs. the Microservice Empire. Tales of a developer, casual blogger & co-host of Front-end chronicles podcast.",
        description: "The meta description for homepage",
      })}
    >
      <Head>
        <meta
          property="og:image"
          content={useBaseUrl("/img/home/nebulon_preview.png")}
        />
        <meta property="og:type" content="profile" />
        <meta property="og:profile:first_name" content="Denis" />
        <meta property="og:profile:last_name " content="Souron" />
        <meta property="og:profile:username" content="brack0" />
      </Head>
      <HomepageHeader />
      <main>
        <HomepageDescription />
      </main>
    </Layout>
  );
}
