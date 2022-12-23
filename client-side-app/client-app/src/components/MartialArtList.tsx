import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { useStore } from "../app/stores/store";
import MartialArtListItem from "./MartialArtListItem";

export default observer(function MartialArtList() {
  const { martialArtStore } = useStore();
  const { groupedMartialArts } = martialArtStore;
  return (
    <>
      {groupedMartialArts.map(([group, martialArts]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {martialArts &&
            martialArts.map((martialArt) => (
              <MartialArtListItem key={martialArt.id} martialArt={martialArt} />
            ))}
        </Fragment>
      ))}
    </>
  );
});
