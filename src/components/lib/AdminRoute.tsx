import { useSession } from "next-auth/react";
import LoadingToRedirect from './LoadingToRedirect';

interface ParentProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: ParentProps) => {
  const { data: session, status } = useSession();

  const authenticated = status === "authenticated";
  const adminRole = session?.user.role === "ADMIN";

  return authenticated && adminRole ? <>{children}</> : <LoadingToRedirect />;

};

export default AdminRoute;
