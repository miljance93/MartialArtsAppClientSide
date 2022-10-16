import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponent from "../layout/LoadingComponent";
import { useStore } from "../stores/store";

export default function MartialArtDetail() {
  const { martialArtStore } = useStore();
  const {
    selectedMartialArt: martialArt,
    openForm,
    cancelSelectedMartialArt,
  } = martialArtStore;

  if (!martialArt) return <LoadingComponent />;
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${martialArt.name}.jpg`} />

      <Card.Content extra>
        <Card.Header>{martialArt.name}</Card.Header>
        <Card.Description>{martialArt.longDescription}</Card.Description>
        <Button.Group>
          <Button
            onClick={() => openForm(martialArt.id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectedMartialArt}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
