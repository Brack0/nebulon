import { translate } from "@docusaurus/Translate";
import HomepageDescription from "@site/src/components/HomepageDescription";
import Layout from "@theme/Layout";
import React from "react";
import HomepageHeader from "../components/HomepageHeader";

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`127.0.0.1`}
      description={translate({
        id: "homepage.tagline",
        message: "The Rebel Alliance's blog vs. the Microservice Empire",
        description: "The homepage tagline",
      })}
    >
      <HomepageHeader />
      <main>
        <HomepageDescription />
      </main>
    </Layout>
  );
}
