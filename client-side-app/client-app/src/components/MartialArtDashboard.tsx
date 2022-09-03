import { Grid } from "semantic-ui-react";
import { MartialArt } from "../app/models/martialArt";
import MartialArtList from "./MartialArtList";
import MartialArtDetail from "../app/details/MartialArtDetail";
import MartialArtForm from "./form/MartialArtForm";

interface Props {
  martialArts: MartialArt[];
  selectedMartialArt: MartialArt | undefined;
  selectMartialArt: (id: string) => void;
  cancelSelectMartialArt: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  deleteMartialArt: (id: string) => void;
}

export default function MartialArtDashboard({
  martialArts,
  selectedMartialArt,
  selectMartialArt,
  cancelSelectMartialArt,
  editMode,
  openForm,
  closeForm,
  deleteMartialArt,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <MartialArtList
          martialArts={martialArts}
          selectMartialArt={selectMartialArt}
          deleteMartialArt={deleteMartialArt}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedMartialArt && !editMode && (
          <MartialArtDetail
            martialArt={selectedMartialArt}
            cancelSelectMartialArt={cancelSelectMartialArt}
            openForm={openForm}
          />
        )}
        {editMode && (
          <MartialArtForm
            closeForm={closeForm}
            martialArt={selectedMartialArt}
          />
        )}
      </Grid.Column>
    </Grid>
  );
}
