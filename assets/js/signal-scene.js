import * as THREE from "../vendor/three.module.min.js";

const hero = document.querySelector("[data-scene-hero]");
const canvas = document.querySelector("[data-signal-scene]");

if (hero && canvas) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let renderer;

  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (_error) {
    renderer = null;
  }

  if (renderer) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    const packet = new THREE.Group();
    const fieldWidths = [0.42, 0.42, 0.42, 0.42, 0.42, 0.42, 2.8, 0.84];
    const fields = [];
    const geometries = [];
    const materials = [];

    let cursor = 0;
    fieldWidths.forEach((width, index) => {
      const geometry = new THREE.BoxGeometry(width, 1.28, 0.72);
      const material = new THREE.MeshStandardMaterial({
        color: index === 6 ? 0x6b5877 : 0x3f3348,
        roughness: 0.58,
        metalness: 0.18,
        transparent: true,
        opacity: index === 6 ? 0.96 : 0.82
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = cursor + width / 2;
      mesh.userData.homeX = mesh.position.x;
      cursor += width + 0.11;

      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(geometry),
        new THREE.LineBasicMaterial({ color: 0xb8a4c5, transparent: true, opacity: 0.45 })
      );
      mesh.add(edges);
      packet.add(mesh);
      fields.push(mesh);
      geometries.push(geometry, edges.geometry);
      materials.push(material, edges.material);
    });

    packet.position.set(-cursor / 2 + 1.4, 0.1, 0);
    packet.rotation.set(-0.16, -0.28, -0.05);
    scene.add(packet);

    const pointGeometry = new THREE.BufferGeometry();
    const pointCount = 72;
    const pointPositions = new Float32Array(pointCount * 3);
    for (let index = 0; index < pointCount; index += 1) {
      pointPositions[index * 3] = (index / (pointCount - 1) - 0.5) * 14;
      pointPositions[index * 3 + 1] = Math.sin(index * 0.72) * 0.55 + Math.sin(index * 0.17) * 0.18;
      pointPositions[index * 3 + 2] = Math.cos(index * 0.41) * 1.1 - 2.4;
    }
    pointGeometry.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
    const pointMaterial = new THREE.PointsMaterial({ color: 0x92869b, size: 0.025, transparent: true, opacity: 0.48 });
    const points = new THREE.Points(pointGeometry, pointMaterial);
    const signalMaterial = new THREE.LineBasicMaterial({ color: 0x544262, transparent: true, opacity: 0.28 });
    const signalLine = new THREE.Line(pointGeometry, signalMaterial);
    scene.add(points);
    scene.add(signalLine);
    geometries.push(pointGeometry);
    materials.push(pointMaterial, signalMaterial);

    scene.add(new THREE.AmbientLight(0xddd5e3, 1.15));
    const keyLight = new THREE.DirectionalLight(0xb8a4c5, 3.2);
    keyLight.position.set(4, 5, 7);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x544262, 14, 16);
    rimLight.position.set(-4, -1, 3);
    scene.add(rimLight);

    camera.position.set(0.5, 0.2, 8.5);

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const pointer = new THREE.Vector2();
    let visible = true;
    let frame = 0;
    const clock = new THREE.Clock();

    const resize = () => {
      const bounds = hero.getBoundingClientRect();
      const width = Math.max(1, bounds.width);
      const height = Math.max(1, bounds.height);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const render = () => {
      const elapsed = clock.getElapsedTime();
      if (!reducedMotion.matches) {
        packet.rotation.y += (pointer.x * 0.13 - packet.rotation.y - 0.28) * 0.025;
        packet.rotation.x += (-pointer.y * 0.08 - packet.rotation.x - 0.16) * 0.025;
        packet.position.y = 0.1 + Math.sin(elapsed * 0.55) * 0.045;
        points.rotation.y = elapsed * 0.008;
      }
      renderer.render(scene, camera);
    };

    const animate = () => {
      if (!visible) {
        frame = 0;
        return;
      }
      render();
      frame = requestAnimationFrame(animate);
    };

    const start = () => {
      if (reducedMotion.matches) {
        render();
        return;
      }
      if (!frame) frame = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
      if (visible) start();
      else if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(hero);
    observer.observe(hero);

    hero.addEventListener("pointermove", (event) => {
      const bounds = hero.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
    }, { passive: true });

    document.addEventListener("visibilitychange", () => {
      visible = !document.hidden && hero.getBoundingClientRect().bottom > 0;
      if (visible) start();
    });

    resize();
    render();
    hero.classList.add("is-webgl-ready");
    start();

    const initScroll = () => {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      if (!gsap || !ScrollTrigger) return;

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.65
          }
        });

        timeline.to(packet.rotation, { x: 0.12, y: 0.48, z: 0.08, ease: "none" }, 0);
        timeline.to(camera.position, { x: 1.1, y: 0.35, z: 7.1, ease: "none" }, 0);
        timeline.to(points.material, { opacity: 0.16, ease: "none" }, 0);
        timeline.to(signalMaterial, { opacity: 0.08, ease: "none" }, 0);
        fields.forEach((field, index) => {
          const offset = index - (fields.length - 1) / 2;
          timeline.to(field.position, {
            x: field.userData.homeX + offset * 0.1,
            y: (index % 2 === 0 ? 1 : -1) * Math.abs(offset) * 0.08,
            z: (index % 2 === 0 ? -1 : 1) * Math.abs(offset) * 0.13,
            ease: "none"
          }, 0);
        });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
        };
      });

      window.addEventListener("pagehide", () => media.revert(), { once: true });
    };

    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", initScroll, { once: true });
    } else {
      initScroll();
    }

    window.addEventListener("pagehide", () => {
      observer.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
    }, { once: true });

    window.signalScene = { scene, camera, packet, fields, renderer };
  }
}
