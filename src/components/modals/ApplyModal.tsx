import { useState } from "react";
import type { Job } from "../../types/job";
import { calculateATS } from "../../utils/calculateATS";

type Props = {
  job: Job;
  onClose: () => void;
  onSubmit: () => void;
};

const ApplyModal = ({ job, onClose, onSubmit }: Props) => {
  const [skillsInput, setSkillsInput] = useState("");
  const [showResult, setShowResult] = useState(false);

  const userProfile = {
    skills: skillsInput
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
    cgpa: 7.8,
    branch: "CS",
  };

  const ats = showResult ? calculateATS(job, userProfile) : null;

  return (
    <div className="modal-backdrop">
      <div className="modal-sheet">
        {!showResult ? (
          <>
            <h3 style={{ textAlign: "center" }}>Enter Your Skills</h3>

            <input
              type="text"
              placeholder="e.g. react, css, javascript"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid rgba(148,163,184,0.3)",
                background: "transparent",
                color: "white",
              }}
            />

            <div className="modal-footer">
              <button className="secondary" onClick={onClose}>
                Cancel
              </button>
              <button
                className="primary"
                disabled={!skillsInput}
                onClick={() => setShowResult(true)}
              >
                Check ATS
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 style={{ textAlign: "center" }}>ATS Result</h3>

            <p style={{ textAlign: "center", fontSize: "2rem" }}>
              {ats?.total}%
            </p>

            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              <p>Skill Match: {ats?.breakdown.skillScore} / 60</p>
              <p>Eligibility: {ats?.breakdown.eligibilityScore} / 25</p>
              <p>Relevance: {ats?.breakdown.relevanceScore} / 15</p>
            </div>

            <div className="modal-footer">
              <button className="secondary" onClick={onClose}>
                Close
              </button>
              <button
                className="primary"
                onClick={() => {
                  window.open(job.formLink, "_blank");
                  onSubmit();
                }}
              >
                Continue to Application Form
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
