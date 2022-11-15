import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function MartialArtForm() {
  //initialising new martial art properties

  const { martialArtStore } = useStore();
  const { selectedMartialArt, createMartialArt, updateMartialArt, loading } =
    martialArtStore;

  const initalState = selectedMartialArt ?? {
    id: 0,
    name: "",
    shortDescription: "",
    longDescription: "",
  };

  const [martialArt, setMartialArt] = useState(initalState);

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setMartialArt({ ...martialArt, [name]: value });
  }

  function OnSubmit() {
    martialArt.id ? updateMartialArt(martialArt) : createMartialArt(martialArt);
  }

  return (
    <Segment clearing>
      <Form autoComplete="off" onSubmit={OnSubmit}>
        <Form.Input
          placeholder="Martial Art name"
          value={martialArt.name}
          name="name"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Long description"
          name="longDescription"
          value={martialArt.longDescription}
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Short description"
          name="shortDescription"
          value={martialArt.shortDescription}
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
});
