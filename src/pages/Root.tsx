import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import TopBarMenu from "../components/TopBarMenu/TopBarMenu";

function RootLayout() {
  const location = useLocation();
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 300);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <>
      <TopBarMenu />
      <main className={`fade ${fade ? "fade-in" : "fade-out"}`}>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
