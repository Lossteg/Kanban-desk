import { FC } from "react";
import RegisterForm from "@/features/auth/ui/Register-form";
import AuthImg from  "@/assets/4406c6e741804bf3e3cefae36f09cc8a.png";
import "./index.scss";

const SignUpPage: FC = () => {
  return (
    <div className="signup-container">
      <RegisterForm />
      <div className="signup-img-container">
        <img
          className="signup-img"
          src={AuthImg}
          alt="registration-background"
        />
      </div>
    </div>
  );
};

export default SignUpPage;