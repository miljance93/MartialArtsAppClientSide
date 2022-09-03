import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
  openForm: () => void;
}

export default function NavBar({ openForm }: Props) {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/martialArtLogo.jpg"
            alt="logo"
            style={{ marginRight: 10 }}
          />
          Martial Arts
        </Menu.Item>
        <Menu.Item name="Martial Art" />
        <Menu.Item>
          <Button onClick={openForm} positive content="Create Martial Art" />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
