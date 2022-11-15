import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import MartialArtDashboard from "../../components/MartialArtDashboard";
import NavBar from "./NavBar";
import "./styles.css";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import MartialArtForm from "../../components/form/MartialArtForm";
import MartialArtDetail from "../details/MartialArtDetail";

function App() {
  return (
    // Sa MobX-om
    <>
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ margin: "7em" }}>
              {/*Home page nije observer */}

              {/* Martial Art Dashbord je observer */}
              <Route
                exact
                path="/martialArts"
                component={MartialArtDashboard}
              />
              <Route path="/martialArts/:id" component={MartialArtDetail} />
              <Route path="/createMartialArt" component={MartialArtForm} />
            </Container>
          </>
        )}
      />
    </>

    // Bez MobX-a
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

export default observer(App);
