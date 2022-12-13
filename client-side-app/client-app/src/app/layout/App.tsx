import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import MartialArtDashboard from "../../components/MartialArtDashboard";
import NavBar from "./NavBar";
import "./styles.css";
import { observer } from "mobx-react-lite";
import { Route, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import MartialArtForm from "../../components/form/MartialArtForm";
import MartialArtDetail from "../details/MartialArtDetail";
import TestErrors from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import ProfilePage from "../../features/profiles/ProfilePage";

function App() {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content="Loading app.." />;

  return (
    // Sa MobX-om
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ margin: "7em" }}>
              <Switch>
                <Route
                  exact
                  path="/martialArts"
                  component={MartialArtDashboard}
                />
                <Route path="/martialArts/:id" component={MartialArtDetail} />
                <Route
                  path={["/createMartialArt", "/manage/:id"]}
                  component={MartialArtForm}
                />
                <Route path="/errors" component={TestErrors} />
                <Route path="/server-error" component={ServerError} />
                <Route path="/login" component={LoginForm} />
                <Route path="/profile/:username" component={ProfilePage} />
                <Route component={NotFound} />
              </Switch>
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
