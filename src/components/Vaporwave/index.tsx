import { useColorMode } from "@docusaurus/theme-common";
import Translate from "@docusaurus/Translate";
import useGPUTier from "@site/src/hooks/useGPUTier";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { generate3DAnimation } from "./animation";
import styles from "./styles.module.css";

export default function Vaporwave(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();
  const [enabled, setEnabled] = useState(false);
  const { gpuTier, loading: gpuTierLoading } = useGPUTier();

  useEffect(() => {
    if (enabled || gpuTier > 1) {
      const { launch } = generate3DAnimation(colorMode, canvasRef);

      canvasRef.current.style.display = "block";
      fallbackRef.current.style.display = "none";

      launch();
    }
  }, [colorMode, enabled, gpuTier]);

  return (
    <div>
      <div ref={fallbackRef} className={styles.fallback}>
        {!gpuTierLoading ? (
          <button
            className="button button--outline button--primary"
            onClick={() => setEnabled(true)}
          >
            <Translate
              id="vaporwave.enable"
              description="The vaporwave enable button label"
            >
              Click to enable animation
            </Translate>
          </button>
        ) : null}
      </div>
      <canvas ref={canvasRef} className={clsx("webgl", styles.canvas)}></canvas>
    </div>
  );
}
