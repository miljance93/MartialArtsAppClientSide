import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} to="/" exact header>
          <img
            src="/assets/martialArtLogo.jpg"
            alt="logo"
            style={{ marginRight: 10 }}
          />
          Martial Arts
        </Menu.Item>
        <Menu.Item as={NavLink} to="/martialArts" name="Martial Arts" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createMartialArt"
            positive
            content="Create Martial Art"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
