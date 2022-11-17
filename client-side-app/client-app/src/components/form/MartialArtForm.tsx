import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, FormField, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";

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

  const validationSchema = Yup.object({
    name: Yup.string().required("The name is required"),
    shortDescription: Yup.string().required("Short description is required"),
    longDescription: Yup.string().required("Long description is required"),
  });

  const [martialArt, setMartialArt] = useState(initalState);

  // function handleChange(
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) {
  //   const { name, value } = event.target;
  //   setMartialArt({ ...martialArt, [name]: value });
  // }

  // function OnSubmit() {
  //   martialArt.id ? updateMartialArt(martialArt) : createMartialArt(martialArt);
  // }

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={martialArt}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <Form className="ui form" autoComplete="off" onSubmit={handleSubmit}>
            <MyTextInput name="name" placeholder="Martial Art name" />
            <MyTextArea
              rows={3}
              placeholder="Long description"
              name="longDescription"
            />
            <MyTextInput
              placeholder="Short description"
              name="shortDescription"
            />
            <Button floated="right" positive type="submit" content="Submit" />
            <Button floated="right" type="button" content="Cancel" />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
