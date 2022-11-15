import { observer } from "mobx-react-lite";
import { Header, Image, Item, Segment } from "semantic-ui-react";
import { MartialArt } from "../models/martialArt";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
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
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src={`/assets/categoryImages/${martialArt.name}.jpg`} fluid />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={martialArt.name}
                  style={{ color: "white" }}
                />
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
    </Segment.Group>
  );
});
