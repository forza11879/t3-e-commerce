import React, { useState } from "react";
import { signIn } from "next-auth/react";

function RegisterPage() {
  const [email, setEmail] = useState("");

  const handleSignIn = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await signIn("email", {
        email,
        redirect: false,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const registerForm = () => (
    <form onSubmit={handleSignIn}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-raised">
        Sign In
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
