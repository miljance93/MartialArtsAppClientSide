import React from "react";
import { Button, Item, Segment } from "semantic-ui-react";
import { MartialArt } from "../app/models/martialArt";

interface Props {
  martialArts: MartialArt[];
  selectMartialArt: (id: string) => void;
  deleteMartialArt: (id: string) => void;
}

export default function MartialArtList({
  martialArts,
  selectMartialArt,
  deleteMartialArt,
}: Props) {
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
                  onClick={() => selectMartialArt(martialArt.id.toString())}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  onClick={() => deleteMartialArt(martialArt.id.toString())}
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
}
