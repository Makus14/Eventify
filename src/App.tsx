import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./pages/Root";
import EventifyPage from "./pages/EventifyPage";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: ...
    children: [
      { index: true, element: <EventifyPage /> },
      { path: ":category", element: <EventsPage /> },
      { path: ":category/:id", element: <EventDetailsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
