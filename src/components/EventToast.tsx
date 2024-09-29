import { Toast } from "react-bootstrap";

const EventToast = ({
  isError,
  showToast,
  setShowToast,
}: {
  isError: boolean;
  showToast: boolean;
  setShowToast: (state: boolean) => void;
}) => {
  return (
    <Toast
      show={showToast}
      onClose={() => setShowToast(false)}
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
      }}
      bg={isError ? "danger" : "success"}
      delay={3000}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto">{isError ? "Error" : "Success"}</strong>
      </Toast.Header>
      <Toast.Body className="text-white">
        {isError
          ? "There was an error submitting your application. Please try again."
          : "Your application has been submitted successfully!"}
      </Toast.Body>
    </Toast>
  );
};

export default EventToast;
