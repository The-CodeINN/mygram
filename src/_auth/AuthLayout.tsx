import { useUserContext } from '@/context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className=" flex flex-1 flex-col items-center justify-center py-10">
            <Outlet />
          </section>

          <img
            src="/assets/images/side-img.svg"
            alt="side image"
            className="hidden h-screen w-1/2 bg-no-repeat object-cover xl:block"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
