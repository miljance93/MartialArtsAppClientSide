import { Grid } from "semantic-ui-react";
import MartialArtList from "./MartialArtList";
import { useStore } from "../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../app/layout/LoadingComponent";
import MartialArtFilters from "./MartialArtFilters";

export default observer(function MartialArtDashboard() {
  const { martialArtStore } = useStore();
  const { loadMartialArts, martialArtRegistry } = martialArtStore;

  //Sta je useEffect?
  useEffect(() => {
    if (martialArtRegistry.size <= 1) loadMartialArts();
  }, [martialArtStore]);
  if (martialArtStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <Grid>
      <Grid.Column width="10">
        <MartialArtList />
      </Grid.Column>
      <Grid.Column width="6">
        <MartialArtFilters />
      </Grid.Column>
    </Grid>
  );
});
