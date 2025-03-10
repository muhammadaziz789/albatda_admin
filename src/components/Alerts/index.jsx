import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import "./style.scss";

// Alert severity = [error, warning, info, success]

const Alerts = () => {
  const alerts = useSelector((state) => state.alert.alerts);

  return (
    <div className="alerts_container">
      <div className="Alerts">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            className="alert shake-animation"
            severity={alert.type}
          >
            {alert.title}
          </Alert>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
