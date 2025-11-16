import React from "react";
import { RoughNotation } from "react-rough-notation";
import { useInView } from "react-intersection-observer";
import Form from "@/components/form/Form";
import { fetchWaitlist } from "@/lib/auth";

function Waitlist() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: false });
  fetchWaitlist();
  return (
    <section
      className="waitlist-section"
      id="waitlist"
      aria-labelledby="waitlist-title"
    >
      <div className="waitlist">
        <div className="waitlist-and-image">
          <div className="waitlist-child">
            <div>
              <div className="waitlist-badge badge" role="complementary">
                Only 1000 spots + founding cohort
              </div>
              <h2 id="waitlist-title" className="waitlist-title">
                Don&apos;t Just Dream.{" "}
                <span ref={ref}>
                  <RoughNotation
                    type="underline"
                    show={inView}
                    animate
                    animationDuration={2500}
                    iterations={5}
                    strokeWidth={3}
                    color="#22c55e"
                  >
                    Build
                  </RoughNotation>
                </span>
              </h2>
              <p className="waitlist-subtitle">
                Join the waitlist and we&apos;ll notify you as soon as early
                access opens.
              </p>
            </div>
            <Form />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Waitlist;
