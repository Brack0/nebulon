import { ColorMode } from "@docusaurus/theme-common";
import { MutableRefObject } from "react";
import {
  AmbientLight,
  Clock,
  Color,
  Fog,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SpotLight,
  TextureLoader,
  WebGLRenderer,
} from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader";

const TEXTURE_PATH = "./img/vaporwave/grid.png";
const DISPLACEMENT_PATH = "./img/vaporwave/displacement.png";
const METALNESS_PATH = "./img/vaporwave/metalness.png";

export const generate3DAnimation = (
  colorMode: ColorMode,
  canvasRef: MutableRefObject<HTMLCanvasElement>
) => {
  // Textures
  const textureLoader = new TextureLoader();
  const gridTexture = textureLoader.load(TEXTURE_PATH);
  const terrainTexture = textureLoader.load(DISPLACEMENT_PATH);
  const metalnessTexture = textureLoader.load(METALNESS_PATH);

  // Scene
  const scene = new Scene();
  scene.background = new Color({ dark: 0x000000, light: 0xffffff }[colorMode]);

  // Fog
  const fog = new Fog({ dark: "#000000", light: "#FFFFFF" }[colorMode], 1, 2.5);
  scene.fog = fog;

  // Objects
  const geometry = new PlaneGeometry(1, 2, 24, 24);
  const material = new MeshStandardMaterial({
    map: gridTexture,
    displacementMap: terrainTexture,
    displacementScale: 0.4,
    /**
     * Add a metalnessMap to our material that will tell the renderer
     * where the "rough" parts of our terrains are
     */
    metalnessMap: metalnessTexture,
    /**
     * Make the terrain very very metallic so it will reflect the light
     * and not diffuse it: it will stay black
     */
    metalness: 0.96,
    /**
     * Make the terrain a bit rough so the rough parts will diffuse the light
     * well
     */
    roughness: 0.5,
  });

  const plane = new Mesh(geometry, material);
  plane.rotation.x = -Math.PI * 0.5;
  plane.position.y = 0.0;
  plane.position.z = 0.15;

  const plane2 = new Mesh(geometry, material);
  plane2.rotation.x = -Math.PI * 0.5;
  plane2.position.y = 0.0;
  plane2.position.z = -1.85; // 0.15 - 2 (the length of the first plane)

  scene.add(plane);
  scene.add(plane2);

  // Light
  // Ambient Light
  const ambientLight = new AmbientLight("#ffffff", 10);
  scene.add(ambientLight);

  // Right Spotlight aiming to the left
  const spotlight = new SpotLight(
    { dark: "#77acc5", light: "#3a6f88" }[colorMode],
    20,
    25,
    Math.PI * 0.1,
    0.25
  );
  spotlight.position.set(0.5, 0.75, 2.2);
  // Target the spotlight to a specific point to the left of the scene
  spotlight.target.position.x = -0.25;
  spotlight.target.position.y = 0.25;
  spotlight.target.position.z = 0.25;
  scene.add(spotlight);
  scene.add(spotlight.target);

  // Left Spotlight aiming to the right
  const spotlight2 = new SpotLight(
    { dark: "#77acc5", light: "#3a6f88" }[colorMode],
    20,
    25,
    Math.PI * 0.1,
    0.25
  );
  spotlight2.position.set(-0.5, 0.75, 2.2);
  // Target the spotlight to a specific point to the right side of the scene
  spotlight2.target.position.x = 0.25;
  spotlight2.target.position.y = 0.25;
  spotlight2.target.position.z = 0.25;
  scene.add(spotlight2);
  scene.add(spotlight2.target);

  // Sizes
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight / 2,
  };

  // Camera
  const camera = new PerspectiveCamera(
    37.5,
    sizes.width / sizes.height,
    0.01,
    20
  );
  camera.position.x = 0;
  camera.position.y = 0.1;
  camera.position.z = 1.1;

  // Renderer
  const renderer = new WebGLRenderer({
    canvas: canvasRef.current,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Post Processing
  const effectComposer = new EffectComposer(renderer);
  effectComposer.setSize(sizes.width, sizes.height);
  effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const renderPass = new RenderPass(scene, camera);
  effectComposer.addPass(renderPass);

  const rgbShiftPass = new ShaderPass(RGBShiftShader);
  rgbShiftPass.uniforms["amount"].value = 0.0015;

  effectComposer.addPass(rgbShiftPass);

  const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
  effectComposer.addPass(gammaCorrectionPass);

  // Event listener to handle screen resize
  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight / 2;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Update effect composer
    effectComposer.setSize(sizes.width, sizes.height);
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const clock = new Clock();

  // Animate
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    plane.position.z = (elapsedTime * 0.15) % 2;
    plane2.position.z = ((elapsedTime * 0.15) % 2) - 2;

    // Render
    effectComposer.render();

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  // Launch the animation with the first call of tick
  return { launch: tick };
};
