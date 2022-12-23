import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { MartialArt } from "../app/models/martialArt";
import { useStore } from "../app/stores/store";
import MartialArtListItemAttendee from "./MartialArtListItemAttendee";

interface Props {
  martialArt: MartialArt;
}

export default function MartialArtListItem({ martialArt }: Props) {
  return (
    <Segment.Group>
      <Segment>
        {martialArt.isCancelled && (
          <Label
            attached="top"
            color="red"
            content="Cancelled"
            style={{ textAlign: "center" }}
          />
        )}
        <Item.Group>
          <Item>
            <Item.Image
              size="small"
              circular
              src={`/assets/categoryImages/${martialArt.name}.jpg`}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/martialArts/${martialArt.id}`}>
                {martialArt.name}
              </Item.Header>
              {martialArt.hostUsername && (
                <Item.Description>
                  Hosted by{" "}
                  <Link to={`/profile/${martialArt.hostUsername}`}>
                    {martialArt.coach?.displayName}
                  </Link>
                </Item.Description>
              )}
              {martialArt.isCoach && (
                <Item.Description>
                  <Label basic color="orange">
                    You are hosting this event
                  </Label>
                </Item.Description>
              )}
              {martialArt.isGoing && !martialArt.isCoach && (
                <Item.Description>
                  <Label basic color="green">
                    You are going to this event
                  </Label>
                </Item.Description>
              )}
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(martialArt.date!, "dd MMM yyyy h:mm aa")}
          <Icon name="marker" />
          {martialArt.city}
        </span>
      </Segment>
      <Segment>
        <MartialArtListItemAttendee attendees={martialArt.attendees} />
      </Segment>
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
