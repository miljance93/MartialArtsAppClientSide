import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/martialArtLogo.jpg"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Martial Arts
        </Header>
        <Header as="h2" inverted content="Welcome to Martial Arts" />
        <Button as={Link} to="/martialArts" size="huge" inverted>
          Take me to Martial Arts!
        </Button>
      </Container>
    </Segment>
  );
}
