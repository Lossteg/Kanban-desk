import { FC } from "react";
import RegisterForm from "../../../features/auth/ui/Register-form";
import AuthImg from "../../../assets/9.png";
import "./index.scss";

const SignUpPage: FC = () => {
  return (
    <div className="signup-container">
      <RegisterForm />
      <img className="signup-img" src={AuthImg} alt="registration-background"/>
    </div>
  );
};

export default SignUpPage;