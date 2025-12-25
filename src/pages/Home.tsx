import { useState } from "react";
import { jobs } from "../data/jobs";
import SwipeContainer from "../components/swipe/SwipeContainer";
import JobDetailModal from "../components/modals/JobDetailModal";
import type { Job } from "../types/job";

const Home = () => {
  const [index, setIndex] = useState(0);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [interestedJobs, setInterestedJobs] = useState<Job[]>([]);

  const currentJob = jobs[index];

  const handleSkip = () => setIndex((prev) => prev + 1);

  const handleLike = () => {
    if (currentJob) {
      setInterestedJobs((prev) => [...prev, currentJob]);
    }
    setIndex((prev) => prev + 1);
  };

  const handleApply = (jobId: number) => {
    setAppliedJobs((prev) => [...prev, jobId]);
  };

  return (
    <div className="app-container">
      <h1 style={{ marginBottom: "8px" }}>Job Swipe</h1>

      <p style={{ fontSize: "0.9rem", color: "#94a3b8", marginBottom: "20px" }}>
        Interested jobs: {interestedJobs.length}
      </p>

      {currentJob ? (
        <SwipeContainer
          job={currentJob}
          onSkip={handleSkip}
          onLike={handleLike}
          onViewDetails={setSelectedJob}
        />
      ) : (
        <p>No more jobs</p>
      )}

      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApply={handleApply}
          isApplied={appliedJobs.includes(selectedJob.id)}
        />
      )}
    </div>
  );
};

export default Home;
