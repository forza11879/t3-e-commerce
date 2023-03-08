import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const ConfirmRequest = () => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const router = useRouter();

  if (!loading && !session) {
    router.push("/auth/signin").catch((error) => console.log(error));
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : !session ? (
        <p>Redirecting...</p>
      ) : (
        <>
          <h1 className="mt-4 text-2xl font-bold sm:text-4xl">
            You&apos;re logged in!
          </h1>
          <p className="mt-4 text-lg sm:text-2xl">
            Go back to your original tab.
          </p>
          <p className="text-normal mt-6 text-gray-500 sm:text-lg">
            You can close this window or click{" "}
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-600 hover:underline"
            >
              this link
            </Link>{" "}
            to go back to the homepage.
          </p>
        </>
      )}
    </>
  );
};

export default ConfirmRequest;
