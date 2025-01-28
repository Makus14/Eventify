import { Outlet } from "react-router-dom";

import TopBarMenu from "../components/TopBarMenu/TopBarMenu";

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
      <TopBarMenu />
      <main>
        {/* {navigation.state === "loading" && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
