import { useState } from "react";
import type { Job } from "../../types/job";
import ApplyModal from "./ApplyModal";

type Props = {
  job: Job;
  onClose: () => void;
  onApply: (jobId: number) => void;
  isApplied: boolean;
};


const JobDetailModal = ({ job, onClose, onApply, isApplied }: Props) => {
  const [showApply, setShowApply] = useState(false);

  return (
  <div className="modal-backdrop">
    <div className="modal-sheet">
      <div className="modal-header">
        <h2>{job.title}</h2>
        <p className="modal-company">{job.company}</p>
      </div>

      <div className="modal-body">
        <p className="modal-description">{job.description}</p>

        <div className="eligibility">
          <div>
            <span className="label">CGPA</span>
            <span>{job.eligibility.cgpa}</span>
          </div>
          <div>
            <span className="label">Branch</span>
            <span>{job.eligibility.branch}</span>
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button className="secondary" onClick={onClose}>Close</button>
        <button
          className="primary"
          disabled={isApplied}
          onClick={() => setShowApply(true)}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </button>
      </div>

      {showApply && (
        <ApplyModal
          job={job}
          onClose={() => setShowApply(false)}
          onSubmit={() => onApply(job.id)}
        />
      )}
    </div>
  </div>
);

};

export default JobDetailModal;
