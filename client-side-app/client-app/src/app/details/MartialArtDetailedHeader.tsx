import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Header, Image, Item, Label, Segment } from "semantic-ui-react";
import { MartialArt } from "../models/martialArt";
import { useStore } from "../stores/store";

const martialArtImageStyle = {
  filter: "brightness(30%)",
};

const martialArtImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

interface Props {
  martialArt: MartialArt;
}

export default observer(function MartialArtDetailedHeader({
  martialArt,
}: Props) {
  const {
    martialArtStore: { updateAttendance, loading, cancelMartialArtToggle },
  } = useStore();
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        {martialArt.isCancelled && (
          <Label
            style={{ position: "absolute", zIndex: 1000, left: -14, top: 20 }}
            ribbon
            color="red"
            content="Cancelled"
          />
        )}
        <Image src={`/assets/categoryImages/${martialArt.name}.jpg`} fluid />
        <Segment style={martialArtImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={martialArt.name}
                  style={{ color: "white" }}
                />
                <p>
                  Hosted by{" "}
                  <strong>
                    <Link to={`/profiles/${martialArt.coach?.username}`}>
                      {martialArt.coach?.displayName}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        {martialArt.isCoach ? (
          <>
            <Button
              color={martialArt.isCancelled ? "green" : "red"}
              floated="left"
              basic
              content={
                martialArt.isCancelled
                  ? "Re-activate Martial Art"
                  : "Cancel Martial Art"
              }
              onClick={cancelMartialArtToggle}
              loading={loading}
            />
            <Button
              as={Link}
              disabled={martialArt.isCancelled}
              to={`/manage/${martialArt.id}`}
              color="orange"
              floated="right"
            >
              Manage Event
            </Button>
          </>
        ) : martialArt.isGoing ? (
          <Button loading={loading} onClick={updateAttendance}>
            Cancel attendance
          </Button>
        ) : (
          <Button
            disabled={martialArt.isCancelled}
            loading={loading}
            onClick={updateAttendance}
            color="teal"
          >
            Join event
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
});
