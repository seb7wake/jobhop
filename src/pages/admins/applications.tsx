import React, { useEffect, useState } from "react";
import {
  Badge,
  Container,
  Table,
  OverlayTrigger,
  Tooltip,
  Spinner,
} from "react-bootstrap";
import styles from "../../components/ApplicationTable.module.css";
import { Application } from "@/types";
import Header from "../../components/Header";
export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    const response = await fetch("/api/admins/applications");
    const data = await response.json();
    if (!data.error) {
      setApplications(data);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <Container>
        <h1 className="mt-5">Applications</h1>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status" />
          </div>
        ) : (
          <Table striped bordered hover responsive className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>#</th>
                <th>Candidate ID</th>
                <th>Job Name</th>
                <th>Status</th>
                <th>Applied At</th>
                <th>Location</th>
                <th>Source</th>
                <th>Current Stage</th>
              </tr>
            </thead>
            <tbody>
              {applications?.map((app, index) => (
                <tr key={app.id}>
                  <td>{index + 1}</td>
                  <td>{app.candidate_id}</td>
                  <td>{app.jobs.map((job) => job.name).join(", ")}</td>
                  <td>
                    <Badge
                      bg={app.status === "active" ? "success" : "secondary"}
                    >
                      {app.status}
                    </Badge>
                  </td>
                  <td>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-${app.id}`}>
                          {`Applied on ${new Date(
                            app.applied_at
                          ).toLocaleString()}`}
                        </Tooltip>
                      }
                    >
                      <span>
                        {new Date(app.applied_at).toLocaleDateString()}
                      </span>
                    </OverlayTrigger>
                  </td>
                  <td>{app.location?.address || "N/A"}</td>
                  <td>{app.source?.public_name || "N/A"}</td>
                  <td>{app.current_stage.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
}
