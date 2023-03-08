import React, { useState, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";

// import getConfig from "next/config";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
import { useRouter } from "next/router";
// import { auth } from "@/lib/firebase.js";
// import { selectUser } from "@/store/user.js";

function RegisterPage() {
  const [email, setEmail] = useState("");

  const router = useRouter();
  // const user = useSelector(selectUser);

  // useEffect(() => {
  //   if (user && user.token) router.push(`/`);
  // }, [user]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // const config = {
    //   url: process.env.registerRedirectUrl, // e-mail link send to the client e-mail to complete the registration
    //   handleCodeInApp: true,
    // };

    // await auth.sendSignInLinkToEmail(email, config);
    // toast.success(
    //   `Email is sent to ${email}. Click the link to complete your registration.`
    // );
    // save user email in local storage to complete the registration when the client receives the email in the inbox
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  const handleSignIn = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    // let toastId;
    try {
      // toastId = toast.loading('Loading...');
      // setDisabled(true);
      // Perform sign in
      const signInResponse = await signIn("email", {
        email,
        redirect: false,
        // callbackUrl: "/",
        callbackUrl: `${window.location.origin}/auth/confirm-request`,
      });
      // Something went wrong
      if (signInResponse?.error) {
        throw new Error(signInResponse?.error);
      }
      // setShowModal(true);
      // toast.success('Magic link successfully sent', { id: toastId });
    } catch (error) {
      console.log(error);
      // toast.error('Unable to send magic link', { id: toastId });
    }
    //  finally {
    //   // setDisabled(false);
    // }
  };

  const registerForm = () => (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
        Register
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

{
  /* <div className="flex flex-col items-center justify-center text-center max-w-sm">
        
          <h3 className="mt-2 text-2xl font-semibold">Confirm your email</h3>
          <p className="mt-4 text-lg">
            We emailed a magic link to <strong>{email}</strong>. Check your
            inbox and click the link in the email to login.
          </p>
        </div> */
}
