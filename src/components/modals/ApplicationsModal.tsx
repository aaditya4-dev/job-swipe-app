import type { Application } from "../../types/application";

type Props = {
  applications: Application[];
  onClose: () => void;
};

const ApplicationsModal = ({ applications, onClose }: Props) => {
  const getSafeDate = (value: string) => {
    if (!value) return null;
    const d = new Date(value);
    if (isNaN(d.getTime())) return null;
    return d;
  };

  const formatDate = (value: string) => {
    const d = getSafeDate(value);
    if (!d) return "—";
    return d.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 style={{ marginBottom: 16 }}>My Applications</h2>

        {applications.length === 0 ? (
          <p style={{ opacity: 0.7 }}>No applications yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1e293b" }}>
                <th style={thStyle}>Company</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.job.id} style={{ borderBottom: "1px solid #020617" }}>
                  <td style={tdStyle}>{app.job.company}</td>
                  <td style={tdStyle}>{app.job.title}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: 999,
                        fontSize: "0.75rem",
                        background:
                          app.status === "Submitted"
                            ? "rgba(99,102,241,0.15)"
                            : app.status === "Reviewed"
                            ? "rgba(34,197,94,0.15)"
                            : "rgba(239,68,68,0.15)",
                        color:
                          app.status === "Submitted"
                            ? "#a5b4fc"
                            : app.status === "Reviewed"
                            ? "#4ade80"
                            : "#f87171",
                      }}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td style={tdStyle}>{formatDate(app.appliedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div style={{ marginTop: 16, textAlign: "right" }}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

const thStyle = {
  textAlign: "left" as const,
  padding: "8px 4px",
  fontSize: "0.75rem",
  opacity: 0.7,
};

const tdStyle = {
  padding: "10px 4px",
  fontSize: "0.85rem",
};

export default ApplicationsModal;
