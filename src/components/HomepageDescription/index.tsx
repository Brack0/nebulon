import clsx from "clsx";
import React from "react";
import styles from "./styles.module.css";

export default function HomepageDescription(): JSX.Element {
  return (
    <section className={styles.description}>
      <div className="container">
        <div className="row">
          <div className={clsx("col col--4", styles.hideMobile)}>
            <img src="/img/ts-logo-512.svg" alt="Typescript Logo" />
          </div>
          <div className="col col--8">
            <p>Hello there 👋 !</p>

            <p>
              Développeur, blogueur intermittent et co-animateur du podcast
              Front-end-chronicles.
            </p>

            <p className={styles.italic}>
              Le nom de code <span>Nebulon</span> ne fait pas référence au
              personnage de l'univers Marvel mais bien à la frégate d'escorte
              EF76 Nebulon-B de Star Wars. Si l'empire galactique est le monde
              de l'IT, alors je fais partie de l'alliance rebelle qui combat
              le&nbsp;
              <a href="https://devdriven.by/" target="blank">
                [x] Driven Development
              </a>
              &nbsp;et défend les valeurs humaines. A titre d'exemple, vous avez
              surement tiqué sur le sous-titre de ce blog au sujet des
              microservices, peut-être même que c'est ce qui vous a amené ici.
              Fondamentalement, je n'ai rien contre. Cependant les usages dans
              l'industrie sont excessifs et souvent vantés alors que beaucoup de
              produits en subissent les conséquences (Distributed big ball of
              mud, coûts de développement, testabilité inférieure). Un jour je
              ferai un post pour expliquer ce que je reproche aux microservices,
              article qui sera plus une critique de l'inadéquation
              besoin/solution qu'une satire du déploiement en microservices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
