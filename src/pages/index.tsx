import HomepageDescription from "@site/src/components/HomepageDescription";
import Layout from "@theme/Layout";
import React from "react";
import HomepageHeader from "../components/HomepageHeader";

export default function Home(): JSX.Element {
  return (
    <Layout
      title={`127.0.0.1`}
      description="Le blog de l'Alliance Rebelle contre l'Empire du Microservice"
    >
      <HomepageHeader />
      <main>
        <HomepageDescription />
      </main>
    </Layout>
  );
}
