import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/Root";
import EventifyPage from "./pages/Eventify";
import Events from "./components/Events/Events";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: ...
    children: [
      { index: true, element: <EventifyPage /> },
      { path: ":category", element: <Events /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
