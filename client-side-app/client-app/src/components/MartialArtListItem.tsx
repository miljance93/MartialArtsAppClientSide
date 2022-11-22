import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { MartialArt } from "../app/models/martialArt";
import { useStore } from "../app/stores/store";

interface Props {
  martialArt: MartialArt;
}

export default function MartialArtListItem({ martialArt }: Props) {
  const { martialArtStore } = useStore();
  const { deleteMartialArt } = martialArtStore;

  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size="tiny"
              circular
              src={`/assets/categoryImages/${martialArt.name}.jpg`}
            />
            <Item.Header as={Link} to={`/martialArts/${martialArt.id}`}>
              {martialArt.name}
            </Item.Header>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {martialArt.id}
          <Icon name="marker" />
          {martialArt.id}
        </span>
      </Segment>
      <Segment>Clients go here</Segment>
      <Segment clearing>
        <span>{martialArt.shortDescription}</span>
        <Button
          as={Link}
          to={`/martialArts/${martialArt.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
