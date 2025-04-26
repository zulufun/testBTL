import React from "react";
import { BoxRevealDemo } from "../components/box.jsx"; // Ensure the path is correct
import { GlobeDemo } from "../components/Globe.jsx"; // Ensure the path is correct

export function About() {
  return (
    <div>
        <div className="flex justify-center items-center">
            <BoxRevealDemo /> {/* Include the BoxRevealDemo component */}
            <GlobeDemo />
        </div>

    </div>
  );
}

export default About;
