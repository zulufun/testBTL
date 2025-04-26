import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import BoxReveal from "../components/ui/box-reveal";

export function BoxRevealDemo() {
  return (
    <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8">
      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <p className="text-[3.5rem] font-semibold">
          AI-Driven Cybersecurity<span className="text-[#5046e6]">.</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <h2 className="mt-[.5rem] text-[1rem]">
          Our solution leverages{" "}
          <span className="text-[#5046e6]">Machine Learning</span> to provide
          advanced cybersecurity measures.
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={"#5046e6"} duration={0.5}>
        <div className="mt-6">
          <p>
            <FontAwesomeIcon icon={faArrowRight} /> Real-time threat detection and response using{" "}
            <span className="font-semibold text-[#5046e6]">AI algorithms</span>.
          </p>
          <p>
            <FontAwesomeIcon icon={faArrowRight} /> Continuous monitoring and analysis of network traffic to
            identify potential threats.
          </p>
          <p>
            <FontAwesomeIcon icon={faArrowRight} /> Automated incident response to mitigate risks and protect
            your data.
          </p>
          <p>
            <FontAwesomeIcon icon={faArrowRight} /> Comprehensive reporting and analytics to keep you informed
            about your security posture.
          </p>
        </div>
      </BoxReveal>
    </div>
  );
}
