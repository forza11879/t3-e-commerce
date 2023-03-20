import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/router';

const Headerr: React.FC = () => {

  const router = useRouter();

  //how to execute the following code at the same
  const clickEventHandlerr = async () => {
    // Navigate to the /auth/signin page
    await router.push(`/auth/signin`);
    // Sign out the user
    await signOut();
  };
  return (<div>hello</div>)

}

export default Headerr;
