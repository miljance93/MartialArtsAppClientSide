import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import MartialArtDashboard from "../../components/MartialArtDashboard";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import NavBar from "./NavBar";
import "./styles.css";
import { observer } from "mobx-react-lite";

function App() {
  const { martialArtStore } = useStore();

  //Sta je useEffect?
  useEffect(() => {
    martialArtStore.loadMartialArts();
  }, [martialArtStore]);
  if (martialArtStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    // Sa MobX-om
    <>
      <NavBar />
      <Container style={{ margin: "7em" }}>
        <MartialArtDashboard />
      </Container>
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
