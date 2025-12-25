import { useState } from "react";
import { jobs } from "../data/jobs";
import JobCard from "../components/swipe/JobCard";
import JobDetailModal from "../components/modals/JobDetailModal";
import type { Job } from "../types/job";

const Home = () => {
  const [index, setIndex] = useState(0);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);

  const handleSkip = () => setIndex((prev) => prev + 1);
  const handleLike = () => setIndex((prev) => prev + 1);

  const handleApply = (jobId: number) => {
    setAppliedJobs((prev) => [...prev, jobId]);
  };

  const currentJob = jobs[index];

  return (
    <div className="app-container">
      <h1 style={{ marginBottom: "24px" }}>Job Swipe</h1>

      {currentJob ? (
        <JobCard
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
