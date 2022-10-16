import { Grid } from "semantic-ui-react";
import MartialArtList from "./MartialArtList";
import MartialArtDetail from "../app/details/MartialArtDetail";
import MartialArtForm from "./form/MartialArtForm";
import { useStore } from "../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function MartialArtDashboard() {
  const { martialArtStore } = useStore();
  const { selectedMartialArt, editMode } = martialArtStore;

  return (
    <Grid>
      <Grid.Column width="10">
        <MartialArtList />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedMartialArt && !editMode && <MartialArtDetail />}
        {editMode && <MartialArtForm />}
      </Grid.Column>
    </Grid>
  );
});
