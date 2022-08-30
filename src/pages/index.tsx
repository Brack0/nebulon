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
      title={`127.0.0.1`}
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
          content={useBaseUrl("/img/nebulon_preview.png")}
        />
      </Head>
      <HomepageHeader />
      <main>
        <HomepageDescription />
      </main>
    </Layout>
  );
}
