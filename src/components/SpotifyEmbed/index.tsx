import React from "react";
import styles from "./styles.module.css";

export default function SpotifyEmbed(props: { href: string }): JSX.Element {
  return (
    <iframe
      className={styles.embed}
      src={props.href}
      width="100%"
      height="232"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    ></iframe>
  );
}
