import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import CharactersPage from "./pages/CharactersPage";
import CharacterPage from "./pages/CharacterPage";
import NotFound from "./components/NotFound";
import PageLayout from "./pages/PageLayout";
import PlanetsPage from "./pages/PlanetsPage/PlanetsPage";
import PlanetPage from "./pages/PlanetPage/PlanetPage";
import VehiclesPage from "./pages/VehiclesPage/VehiclesPage";
import VehiclePage from "./pages/VehiclePage/VehiclePage";
import useCustomTheme from "./hooks/useCustomTheme";
import { ThemeProvider } from "@emotion/react";
import AuthorPage from "./pages/Author/AuthorPage";

const App = () => {
  const theme = useCustomTheme();
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        errorElement={
          <PageLayout>
            <NotFound />
          </PageLayout>
        }
      >
        <Route path="/" element={<Navigate to={"/characters"} />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:id" element={<CharacterPage />} />
        <Route path="/planets" element={<PlanetsPage />} />
        <Route path="/planets/:id" element={<PlanetPage />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/vehicles/:id" element={<VehiclePage />} />
        <Route path="/author" element={<AuthorPage />} />
      </Route>
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <RouterProvider router={router} />
        </header>
      </div>
    </ThemeProvider>
  );
};

export default App;
