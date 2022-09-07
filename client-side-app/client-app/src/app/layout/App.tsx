import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import MartialArtDashboard from "../../components/MartialArtDashboard";
import TestComponent from "../../components/TestComponent";
import agent from "../api/agent";
import { MartialArt } from "../models/martialArt";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";
import "./styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  //Sta su useState-s?
  const [martialArts, setMartialArts] = useState<MartialArt[]>([]);
  const [selectedMartialArt, setSelectedMartialArt] = useState<
    MartialArt | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  //Sta je useEffect?
  useEffect(() => {
    axios.get("https://localhost:5001/martialart").then((response) => {
      setMartialArts(response.data.value);
      console.log(response.data.value);
      setLoading(false);
    });
  }, []);

  function handleSelectMartialArt(id: string) {
    setSelectedMartialArt(martialArts.find((x) => x.id.toString() === id));
  }

  function handleCancelSelectMartialArt() {
    setSelectedMartialArt(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectMartialArt(id) : handleCancelSelectMartialArt();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleDeleteMartialArt(id: string) {
    agent.MartialArts.delete(id);
    window.location.reload();
  }

  if (loading) return <LoadingComponent content="Loading app" />;

  return (
    <BrowserRouter>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ margin: "7em" }}>
        <Routes>
          <Route
            path="/martialartdashboard"
            element={
              <MartialArtDashboard
                martialArts={martialArts}
                selectedMartialArt={selectedMartialArt}
                selectMartialArt={handleSelectMartialArt}
                cancelSelectMartialArt={handleCancelSelectMartialArt}
                editMode={editMode}
                openForm={handleFormOpen}
                closeForm={handleFormClose}
                deleteMartialArt={handleDeleteMartialArt}
              />
            }
          ></Route>
        </Routes>
      </Container>
    </BrowserRouter>

    // <div>
    //   <NavBar openForm={handleFormOpen} />
    //   <Container style={{ margin: "7em" }}>
    //     {/* <Router path="/" component={MartialArtDashboard} />
    //     <Router path="/about" component={AboutComponent} />
    //     <Router path="/account" component={AccountComponent} /> */}
    //     <MartialArtDashboard
    //       martialArts={martialArts}
    //       selectedMartialArt={selectedMartialArt}
    //       selectMartialArt={handleSelectMartialArt}
    //       cancelSelectMartialArt={handleCancelSelectMartialArt}
    //       editMode={editMode}
    //       openForm={handleFormOpen}
    //       closeForm={handleFormClose}
    //       deleteMartialArt={handleDeleteMartialArt}
    //     />
    //     {/* <TestComponent placeholder='' /> */}
    //   </Container>
    // </div>
  );
}

export default App;
