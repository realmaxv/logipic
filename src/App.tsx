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
  const isIos = /iphone|ipad|ipod/.test(
    window.navigator.userAgent.toLowerCase()
  );
  const isInStandaloneMode =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    "standalone" in window.navigator && (window.navigator as any).standalone;

  if (isIos && !isInStandaloneMode) {
    showIosInstallInstructions();
  }
  return (
    // <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    //   {" "}
    <RouterProvider router={router} />
    // </ThemeProvider>
  );
}

export default App;
function showIosInstallInstructions() {
  const text = `🍎 Für iOS (Safari)
	1.	Öffne die App in Safari.
	2.	Tippe unten auf das Teilen-Symbol (Quadrat mit Pfeil).
	3.	Wähle „Zum Home-Bildschirm“.
	4.	Gib einen Namen ein und tippe auf „Hinzufügen“.

⸻
`;
  alert(text);
}
