import { useState } from "react";
import { jobs } from "../data/jobs";
import SwipeContainer from "../components/swipe/SwipeContainer";
import JobDetailModal from "../components/modals/JobDetailModal";
import type { Job } from "../types/job"; 
import type { Application } from "../types/application";
import ApplicationsModal from "../components/modals/ApplicationsModal";

const Home = () => {
  const [index, setIndex] = useState(0);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<number[]>([]);
  const [interestedJobs, setInterestedJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]); 
  const [showApplications, setShowApplications] = useState(false);



  const currentJob = jobs[index];

  const handleSkip = () => setIndex((prev) => prev + 1);

  const handleLike = () => {
    if (currentJob) {
      setInterestedJobs((prev) => [...prev, currentJob]);
    }
    setIndex((prev) => prev + 1);
  };

const handleApply = (jobId: number) => {
  const job = jobs.find((j) => j.id === jobId);
  if (!job) return;

  const application = {
    job,
    status: "Submitted" as const,
    appliedAt: new Date().toISOString(),
  }; 
  

  setApplications((prev) => [...prev, application]);
  setAppliedJobs((prev) => [...prev, jobId]);
};


  return (
    <div className="app-container">
      <h1 style={{ marginBottom: "8px" }}>Job Swipe</h1> 
      <button
  className="my-applications-btn"
  onClick={() => setShowApplications(true)}
>
  My Applications
</button>



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
          isApplied={applications.some(a => a.job.id === selectedJob.id)}

        />
      )} 
      {showApplications && (
  <ApplicationsModal
    applications={applications}
    onClose={() => setShowApplications(false)}
  />
)}

    </div>
  );
};

export default Home;
