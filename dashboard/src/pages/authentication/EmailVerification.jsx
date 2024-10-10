import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmailVerification = () => {
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function verify() {
      await axios.post("http://localhost:8000/api/v1/auth/verification", {
        token: params.email,
      });
    }
    verify();
    navigate("/");
  }, []);
  return <div>EmailVerification</div>;
};

export default EmailVerification;
