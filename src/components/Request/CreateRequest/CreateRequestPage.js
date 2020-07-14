import React, { useState, useEffect } from 'react';
import * as requestData from './FormData';
import maPoster from '../../../assets/images/poster.jpg';
import './CreateRequestPage.css';
import { Button, Form, Col, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { createRequest } from '../../../containers/Requests/RequestList/store/actions/actions';

const CreateRequestPage = ({ createRequest, token }) => {
  const [formData, setFormData] = useState({
    phone: '',
    address1: '',
    address2: '',
    city: '',
    zip_code: '',
    locations: [],
    contact_preference: '',
    agree_transfer: null,
    prefered_food: '',
    items_list: '',
    food_restrictions: '',
    household_number: null,
    urgency: '',
    financial_support: '',
    special_info: '',
    share_info: null,
    need_checkin: '',
    extra_info: '',
    ma_pod_setup: '',
    offer_resources: '',
  });

  const { phone, address1, address2, city, zip_code, locations,
    contact_preference, agree_transfer, prefered_food,
    items_list, food_restrictions, household_number,
    urgency, financial_support, special_info,
    share_info, need_checkin, extra_info,
    ma_pod_setup, offer_resources } = formData

  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onRadio = (event) => {
    console.log(event.target)
    setFormData({ ...formData, [event.target.id]: event.target.value });
  }


  const [checkedItems, setCheckedItems] = useState([])
  const onCheck = (event) => {
    if (event.target.checked) {
      setCheckedItems([...checkedItems, event.target.value]);
    } else {
      setCheckedItems(checkedItems.filter(item => item !== event.target.value))
    }
  };

  useEffect(() => {
    setFormData({ ...formData, prefered_food: checkedItems });
  }, [checkedItems]);

  const createCheckboxOptions = (data, controlId) => data.map((option) => (
    <Form.Check
      type="checkbox"
      label={option}
      name={controlId}
      value={option}
      onChange={onCheck}
      key={option}
    />
  ));

  const createRadioOptions = (data, formElement, controlId) => data.map((option) => (
    <Form.Check
      type="radio"
      label={option}
      name={controlId}
      value={option}
      checked={formElement === option}
      onChange={onChange}
      key={option}
    />
  ));

  const createDropdownOptions = (data) => (
    <Form.Control as="select" custom onChange={onRadio}>
      {data.map((option) => (
        <option
          label={option}
          value={option}
          key={option}
        />
      ))};
    </Form.Control>
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const getBool = (value) => value === "Yes"

    const body = {
      phone: phone,
      address1: address1,
      address2: address2,
      city: city,
      zip_code: zip_code,
      locations: locations,
      contact_preference: contact_preference,
      agree_transfer: getBool(agree_transfer),
      prefered_food: prefered_food.toString(),
      items_list: items_list,
      food_restrictions: food_restrictions,
      household_number: household_number,
      urgency: urgency,
      financial_support: financial_support,
      special_info: special_info,
      share_info: getBool(share_info),
      need_checkin: need_checkin,
      extra_info: extra_info,
      ma_pod_setup: getBool(ma_pod_setup),
      offer_resources: offer_resources
    };

    createRequest(body, token);
  }

  return (
    <React.Fragment>
      <h3 className="create-your-request-title">Create your requests</h3>
      <Form className="create-request-form" onSubmit={handleSubmit}>

        <Form.Group controlId="Contact Preference">
          <Form.Label>
            What would be the quickest method of reaching you?{' '}
          </Form.Label>
          {createRadioOptions(requestData.contact_preference, contact_preference, "contact_preference")}
        </Form.Group>

        <Form.Group controlId="locations">
          <Form.Label>
            Where in South King County or Eastside are you located?
          </Form.Label>
          <p>
            This form is for South King County and Eastside. If you're in Seattle,
            please complete this
              <a href="https://docs.google.com/forms/d/1rOkXW6ElVT0MH9oSI-TuW8L5szCt-ULbZhWebARRZNI/viewform">
              {' '}Form
              </a>:
            </p>
          {createDropdownOptions(requestData.locations, locations)}
        </Form.Group>

        <Form.Group controlId="Contact Info">
          <Form.Group controlId="address1">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              placeholder="###-###-####"
              name='phone'
              value={phone}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group controlId="address1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="1234 Main St"
              name='address1'
              value={address1}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group controlId="address2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              placeholder="Apartment, studio, or floor"
              name='address2'
              value={address2}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                name='city'
                value={city}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="zip_code">
              <Form.Label>Zip</Form.Label>
              <Form.Control

                name='zip_code'
                value={zip_code}
                onChange={onChange}
              />
            </Form.Group>
          </Form.Row>
        </Form.Group>

        <Form.Group controlId="Redirect Request">
          <Form.Label>
            If you live outside of our service area, can we send your request
            details to another local mutual aid organization who we trust?
          </Form.Label>
          <p>
            If you say yes, it will be will be faster and simpler to get you
            your delivery! If you say no and you live outside of our range, we
            will let you know that we can't help you and tell you where to go to
            find help for your location, which may take a while, and then you
            will have to fill out another group's form and begin the whole
            process again from scratch. (We will never share your information
            with advertisers, political candidates or parties, corporations, or
            the government.)
          </p>

          {createRadioOptions(["Yes", "No"], agree_transfer, "agree_transfer")}

        </Form.Group>

        <Form.Group controlId="Food Preference">
          <Form.Label>
            Food Preference?
          </Form.Label>
          {createCheckboxOptions(requestData.food_preference, "preferred_food")}
        </Form.Group>

        <Form.Group controlId="Food Details">
          <Form.Label>
            We are on a volunteer basis and actively fundraising. At this moment
            we are set up to prioritize delivering ONLY ESSENTIAL/URGENT/
            IMMEDIATE needs of our community members. What are the essential/
            urgent items you need?
          </Form.Label>
          <p>
            Items can be general like "milk," or specific like "a 24-pack of the
            purple Always brand overnight menstrual pads with wings." We will do
            our best to match your requests, but if we can't find something
            specific we may get you a similar substitute. We trust you to know
            your needs and we are committed to delivery without judgement.
          </p>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Your answer"
            name="items_list"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group controlId="Food Restrictrions">
          <Form.Label>
            Do you have any restrictions, allergies or intolerances? If there
            are no allergies/ restrictions, enter none.
          </Form.Label>
          <Form.Control
            placeholder="Your answer"
            name="food_restrictions"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group controlId="household-size">
          <Form.Label>How many individuals are in your household?</Form.Label>
          <Form.Control
            placeholder="Your answer"
            name="household_number"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group controlId="Urgency">
          <Form.Label>
            How urgent is your need? Please allow us 48 hours to respond to your
            request.
          </Form.Label>
          {createRadioOptions(requestData.urgency, urgency, 'urgency')}
        </Form.Group>

        <Form.Group controlId="Delivery-Support">
          <Form.Label>
            Would you like financial support with your delivery?
          </Form.Label>
          <p>
            We can fund supplies up to a certain amount per request (While
            funding lasts) for folks who are quarantined without pay, sick,
            disabled, elderly, undocumented, queer, Black, Indigenous, and/or
            people of color.
          </p>
          {createRadioOptions(requestData.financial_support, financial_support, "financial_support")}
          <a href="https://www.gofundme.com/f/covid19-eastside-survival-fund">https://www.gofundme.com/f/covid19-eastside-survival-fund</a>
        </Form.Group>

        <Form.Group controlId="Social-Privileges">
          <Form.Label>
            Can you tell us about your social location, privileges you do or
            don’t have, whether you are Black, Indigenous, Person of Color
            (BIPOC), identify as a survivor of domestic or sexual violence, etc.
          </Form.Label>
          <Form.Control
            placeholder="Your answer"
            name="special_info"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group controlId="Share-Contact">
          <Form.Label>
            Is it okay to share your contact number, address, and grocery list
            with the volunteer who is doing the delivery?
          </Form.Label>
          {createRadioOptions(["Yes", "No"], share_info, "share_info")}
        </Form.Group>

        <Form.Group controlId="Checkin">
          <Form.Label>
            Would you like us to check in via text or call every few weeks to
            support you in your health and wellbeing?
          </Form.Label>
          {createRadioOptions(requestData.need_checkin, need_checkin, "need_checkin")}
        </Form.Group>

        <Form.Group controlId="Question">
          <Form.Label>
            Are there things you would like us to know? (any support or
            resources you would like to offer, questions, comments, concerns).
          </Form.Label>
          <Form.Control
            placeholder="Your answer"
            name="extra_info"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group controlId="join-group">
          <Form.Label>
            Are you interested in joining your neighborhood mutual aid pod or
            need assistance in setting up your own mutual aid pod to support
            yourself and your neighbors with current/ future needs? If so,
            please go this link to join our Neighborhood Mutual Aid Pods Group:
            tinyurl.com/KCMutualAidPod
          </Form.Label>
          {createRadioOptions(["Yes", "No"], ma_pod_setup, 'ma_pod_setup')}
        </Form.Group>

        <Form.Group controlId="Question2">
          <Form.Label>
            Is there anything else you would like us to know about resources you
            can offer?
          </Form.Label>
          <p>
            In the near future, we are considering expanding the types of mutual
            aid we offer. These might include emotional support, household chore
            assistance, childcare, dog walking, etc. Please note access details
            when possible, like: are you able to be scent-free (
            <a href="http://thinkbeforeyoustink.com/howtogofragrancefree.html">
              How to go fragrance free
            </a>
            )? Can you speak several languages, or sign languages? Do you have a
            wheelchair accessible van?
          </p>
          <Form.Control
            placeholder="Your answer"
            name="offer_resources"
            onChange={onChange}
          />
        </Form.Group>

        <Image src={maPoster} fluid />

        {/* TODO show poster here */}

        <Button type="submit" className='mt-5'>Submit</Button>
      </Form>
    </React.Fragment>
  );
};

const mapStateToProps = (state, props) => {
  return {
    goTo: props.history.push,
    token: state.auth.access
  };
};


export default withRouter(connect(mapStateToProps, { createRequest })(CreateRequestPage));