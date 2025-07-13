import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddForm from "./pages/AddForm";
import Weekdays from "./pages/Weekdays";
import SingleEmployee from "./pages/SingleEmployee";

const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: "/", Component: Dashboard },
      { path: "/employees", Component: Employees },
      { path: "/employees/:id", Component: SingleEmployee },
      { path: "/weekdays", Component: Weekdays },
      { path: "/add", Component: AddForm },
    ],
  },
]);

function App() {
  return (
    // <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    //   {" "}
    <RouterProvider router={router} />
    // </ThemeProvider>
  );
}

export default App;
