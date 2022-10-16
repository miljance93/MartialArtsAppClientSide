import { observer } from "mobx-react-lite";
import { Button, Item, Segment } from "semantic-ui-react";
import { useStore } from "../app/stores/store";

export default observer(function MartialArtList() {
  const { martialArtStore } = useStore();
  const { deleteMartialArt, martialArts } = martialArtStore;
  return (
    <Segment>
      <Item.Group divided>
        {martialArts.map((martialArt) => (
          <Item key={martialArt.id}>
            <Item.Content>
              <Item.Header as="a">{martialArt.name}</Item.Header>
              <Item.Description>{martialArt.shortDescription}</Item.Description>
              <Item.Extra>
                <Button
                  onClick={() =>
                    martialArtStore.selectMartialArt(martialArt.id)
                  }
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={() => deleteMartialArt(martialArt.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
});
