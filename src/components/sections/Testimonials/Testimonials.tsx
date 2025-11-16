"use client";
import React from "react";
import ProgressBar from "@/components/progress-bar/ProgressBar";

function Testimonials() {
  const handleClaimSpot = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="matching-article" aria-labelledby="beyond-matchmaking-title">
        <h2 id="beyond-matchmaking-title" className="section-title">Beyond Matchmaking</h2>
        <p className="match-desc">
          We don&apos;t just connect you with potential co-founders. We provide
          the tools, resources, and community support you need to build lasting
          partnerships and successful startups.
        </p>
      </section>
      
      <div className="matchmaking-png" role="img" aria-label="Matchmaking process visualization"></div>

      <section className="matching" aria-labelledby="founding-member-title">
        <div className="matching-overlay">
          <div className="progress-bar-container">
            <ProgressBar />
          </div>

          <div className="img-cta">
            <div className="founding-member-card">
              <div className="headline">
                <h2 id="founding-member-title" className="section-title founding-member-title">
                  Be Remembered as One of the First 1000
                </h2>
                <p className="match-desc match-description text-dark">
                  Your name will go down as part of the community that started
                  it all. Join today and claim your spot as a Founding Builder
                  of Virofund.
                </p>
                <button
                  onClick={handleClaimSpot}
                  className="cta-button founding-member-button"
                  type="button"
                  aria-label="Navigate to waitlist signup to claim your founding member spot"
                >
                  Claim Your Spot
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;
