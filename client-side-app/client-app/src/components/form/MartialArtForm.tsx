import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { MartialArt } from "../../app/models/martialArt";

interface Props {
  martialArt: MartialArt | undefined;
  closeForm: () => void;
}

export default function MartialArtForm({
  martialArt: selectedMartialArt,
  closeForm,
}: Props) {
  //initialising new martial art properties
  const initalState = selectedMartialArt ?? {
    id: "",
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

  //Creating an axios POST method
  const onCreateSubmit = async () => {
    const { data } = await axios.post<MartialArt>(
      "https://localhost:5001/martialart",
      {
        name: martialArt.name,
        shortDescription: martialArt.shortDescription,
        longDescription: martialArt.longDescription,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log(data);
    window.location.reload();
    return data;
  };

  //Creating an axios PUT method
  async function OnEditSubmit() {
    const { data } = await axios.put<MartialArt>(
      "https://localhost:5001/martialart",
      {
        id: martialArt.id,
        name: martialArt.name,
        shortDescription: martialArt.shortDescription,
        longDescription: martialArt.longDescription,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log(data);
    window.location.reload();
    return data;
  }

  function OnSubmit() {
    martialArt.id ? OnEditSubmit() : onCreateSubmit();
  }

  return (
    <Segment clearing onSubmit={OnSubmit}>
      <Form autoComplete="off">
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
        <Button
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
