import React from "react";
import { Segment, List, Label, Item, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { MartialArt } from "../models/martialArt";

interface Props {
  martialArt: MartialArt;
}

export default observer(function ActivityDetailedSidebar() {
  {
    /* if (!attendees) return null;*/
  }
  return (
    <>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        3 people going
      </Segment>
      <Segment attached>
        <List relaxed divided>
          <Item style={{ position: "relative" }}>
            <Label
              style={{ position: "absolute" }}
              color="orange"
              ribbon="right"
            >
              Host
            </Label>
            <Image size="tiny" src={"/assets/user.png"} />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`#`}>Bob</Link>
              </Item.Header>

              <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
            </Item.Content>
          </Item>
        </List>
      </Segment>
    </>
  );
});
