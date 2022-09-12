import Head from "@docusaurus/Head";
import React, { CSSProperties } from "react";

type ImageSize = `${number}x` | `${number}w`;

export default function Image(props: {
  href: string;
  height: number;
  width: number;
  alt: string;
  preload: boolean;
  sizes?: ImageSize[];
  media?: string;
  style?: CSSProperties;
}): JSX.Element {
  const srcSet = props.sizes ? buildSrcSet(props.href, props.sizes) : undefined;
  return (
    <>
      {props.preload ? (
        <Head>
          <link
            rel="preload"
            href={props.href}
            imageSrcSet={srcSet}
            as="image"
            media={props.media}
          />
        </Head>
      ) : null}
      <img
        src={props.href}
        srcSet={srcSet}
        style={props.style}
        height={props.height}
        width={props.width}
        alt={props.alt}
      />
    </>
  );
}

const buildSrcSet = (href: string, sizes: ImageSize[]): string =>
  sizes.map((size) => toSizedImage(href, size)).join(", ");

const toSizedImage = (href: string, size: ImageSize) => {
  const [fileName, fileExtension] = href.split(".");
  return `${fileName}@${size}.${fileExtension} ${size}`;
};
