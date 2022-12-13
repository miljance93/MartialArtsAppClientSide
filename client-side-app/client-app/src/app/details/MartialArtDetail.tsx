import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../layout/LoadingComponent";
import { useStore } from "../stores/store";
import MartialArtDetailedChat from "./MartialArtDetailedChat";
import MartialArtDetailedHeader from "./MartialArtDetailedHeader";
import MartialArtDetailedInfo from "./MartialArtDetailedInfo";
import MartialArtDetailedSidebar from "./MartialArtDetailedSidebar";

export default observer(function MartialArtDetail() {
  const { martialArtStore } = useStore();
  const {
    selectedMartialArt: martialArt,
    loadMartialArt,
    loadingInitial,
  } = martialArtStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadMartialArt(id);
  }, [id, loadMartialArt]);

  if (loadingInitial || !martialArt) return <LoadingComponent />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <MartialArtDetailedHeader martialArt={martialArt} />
        <MartialArtDetailedInfo martialArt={martialArt} />
        <MartialArtDetailedChat martialArtId={martialArt.id} />
      </Grid.Column>
      <Grid.Column width={6}>
        <MartialArtDetailedSidebar martialArt={martialArt} />
      </Grid.Column>
    </Grid>
  );
});
