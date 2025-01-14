import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, ListGroup } from "react-bootstrap";
import keycloak from "../keycloak/KeycloakConfig"; // Corrected import path for Keycloak

function LoadPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const doctorId = keycloak.subject; // Or keycloak.tokenParsed.preferred_username
    console.log("subjectID: ", doctorId);
    console.log("keycloakTokenparsed:", keycloak.tokenParsed);

    // Construct the API endpoint using doctorId
    const endpoint = `${
      import.meta.env.VITE_RESOURCE_SERVER_API_URL
    }/api.medical-record/v1/patients/simple/${doctorId}/doctor`; // Use full API URL from env

    // Fetch the patient data
    axios
      .get(endpoint)
      .then((response) => {
        setPatients(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error loading patients");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner animation="border" />
        Loading Patients...
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h3>Patients List</h3>
      <ListGroup>
        {patients.map((patient) => (
          <ListGroup.Item key={patient.id}>
            <div>
              <strong>Patient UC: </strong> {patient.ucn}
            </div>
            <div>
              <strong>Health Insured: </strong>{" "}
              {patient.isHealthInsured ? "Yes" : "No"}
            </div>
            <div>
              <strong>Doctor: </strong>{" "}
              {`${patient.doctor.firstName} ${patient.doctor.lastName}`}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default LoadPatients;
