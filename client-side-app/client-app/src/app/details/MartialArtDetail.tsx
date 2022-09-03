import { Button, Card, Image } from "semantic-ui-react";
import { MartialArt } from "../models/martialArt";

interface Props {
  martialArt: MartialArt;
  cancelSelectMartialArt: () => void;
  openForm: (id: string) => void;
}

export default function MartialArtDetail({
  martialArt,
  cancelSelectMartialArt,
  openForm,
}: Props) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${martialArt.name}.jpg`} />

      <Card.Content extra>
        <Card.Header>{martialArt.name}</Card.Header>
        <Card.Description>{martialArt.longDescription}</Card.Description>
        <Button.Group>
          <Button
            onClick={() => openForm(martialArt.id.toString())}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={cancelSelectMartialArt}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
