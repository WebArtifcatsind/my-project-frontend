import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const HeroParticles = () => {
  const particlesInit = async (main) => {
    console.log("Particles init started"); // Debug log
    try {
      await loadFull(main);
      console.log("Particles loaded successfully"); // Debug log
    } catch (error) {
      console.error("Particles loading error:", error); // Debug log
    }
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false, zIndex: -1 }, // Important change
        background: {
          color: "#000000",
        },
        particles: {
          number: {
            value: 500,
            density: {
              enable: true,
              value_area: 3000,
            },
          },
          color: {
            value: "#0239ffff",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
            random: true,
          },
          size: {
            value: 3,
            random: true,
          },
          links: {
            enable: true,
            distance: 150,
            color:  "#00eaff99",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "bounce",
            bounce: true,
          },
        },
        interactivity: {
          detect_on: "window",
          events: {
            onhover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default HeroParticles;