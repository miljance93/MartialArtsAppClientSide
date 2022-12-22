import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import MartialArtListItem from "./MartialArtListItem";

export default observer(function MartialArtList() {
  const { martialArtStore } = useStore();
  const { martialArtsByDate } = martialArtStore;
  return (
    <>
      {martialArtsByDate.map((martialArt) => (
        <MartialArtListItem key={martialArt.id} martialArt={martialArt} />
      ))}
    </>
  );
});
