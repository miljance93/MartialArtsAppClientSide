import { observer } from "mobx-react-lite";
import { format } from "date-fns";
import React, { SyntheticEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Grid, Header, Tab, TabProps, Image } from "semantic-ui-react";
import { UserMartialArt } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

const panes = [
  { menuItem: "Future Events", pane: { key: "future" } },
  { menuItem: "Past Events", pane: { key: "past" } },
  { menuItem: "Hosting", pane: { key: "hosting" } },
];

export default observer(function ProfileMartialArts() {
  const { profileStore } = useStore();
  const { loadUserMartialArts, profile, loadingMartialArts, userMartialArts } =
    profileStore;

  useEffect(() => {
    loadUserMartialArts(profile!.username);
  }, [loadUserMartialArts, profile]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserMartialArts(
      profile!.username,
      panes[data.activeIndex as number].pane.key
    );
  };
  return (
    <Tab.Pane loading={loadingMartialArts}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="calendar" content={"Martial Arts"} />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            panes={panes}
            menu={{ secondary: true, pointing: true }}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <Card.Group itemsPerRow={4}>
            {userMartialArts.map((martialArt: UserMartialArt) => (
              <Card
                as={Link}
                to={`/martialArts/${martialArt.id}`}
                key={martialArt.id}
              >
                <Image
                  src={`/assets/categoryImages/${martialArt.title}.jpg`}
                  style={{ minHeight: 100, objectFit: "cover" }}
                />
                <Card.Content>
                  <Card.Header textAlign="center">
                    {martialArt.title}
                  </Card.Header>
                  <Card.Meta textAlign="center">
                    <div>{format(new Date(martialArt.date), "do LLL")}</div>
                    <div>{format(new Date(martialArt.date), "h:mm a")}</div>
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
});
