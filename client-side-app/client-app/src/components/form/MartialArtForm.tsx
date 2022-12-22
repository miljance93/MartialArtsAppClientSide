import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import { MartialArtFormValues } from "../../app/models/martialArt";
import { Link, useHistory, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import LoadingComponent from "../../app/layout/LoadingComponent";
import MyDateInput from "../../app/common/form/MyDateInput";

export default observer(function MartialArtForm() {
  //initialising new martial art properties

  const history = useHistory();
  const { martialArtStore } = useStore();
  const {
    selectedMartialArt,
    createMartialArt,
    updateMartialArt,
    loading,
    loadingInitial,
    loadMartialArt,
  } = martialArtStore;

  const { id } = useParams<{ id: string }>();

  // const initalState = selectedMartialArt ?? {
  // id: 0,
  // name: "",
  // shortDescription: "",
  // longDescription: "",
  // };

  const validationSchema = Yup.object({
    name: Yup.string().required("The Martial Art name is required"),
    shortDescription: Yup.string().required("Short description is required"),
    longDescription: Yup.string().required("Long description is required"),
    venue: Yup.string().required("Venue is required"),
    city: Yup.string().required("City is required"),
    date: Yup.string().required("Date is required").nullable(),
  });

  const [martialArt, setMartialArt] = useState<MartialArtFormValues>(
    new MartialArtFormValues()
  );

  useEffect(() => {
    if (id)
      loadMartialArt(id).then((martialArt) =>
        setMartialArt(new MartialArtFormValues(martialArt))
      );
  }, [id, loadMartialArt]);

  function handleFormSubmit(martiaArt: MartialArtFormValues) {
    if (!martiaArt.id) {
      let newMartialArt = {
        ...martiaArt,
        id: uuid(),
      };
      createMartialArt(newMartialArt).then(() =>
        history.push(`/martialArts/${newMartialArt.id}`)
      );
    } else {
      updateMartialArt(martiaArt).then(() =>
        history.push(`/martialArts/${martiaArt.id}`)
      );
    }
  }

  if (loadingInitial)
    return <LoadingComponent content="Loading Martial Art..." />;

  return (
    <Segment clearing>
      <Header content="Martial Art Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={martialArt}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
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

            <MyDateInput
              name="date"
              placeholderText="Date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header content="Location Details" sub color="teal" />
            <MyTextInput name="venue" placeholder="Venue" />
            <MyTextInput name="city" placeholder="City" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/martialarts"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
