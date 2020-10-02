import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { fetchRequestDetail, deleteRequest, updateRequest } from './store/actions/actions';
import DeleteModal from '../../../components/Modal/DeleteModal/DeleteModal';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Aux from '../../../hoc/Aux/Aux';
import Requests from '../Requests';
import UpdateRequestSupport from '../../../components/Request/CreateRequest/RequestSupport';
import * as requestStatus from '../requestStatus';

const RequestDetail = (props) => {
  const { request, loading, fetchRequestDetail, deleteRequest, updateRequest, name, history } = props;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null)
  const [updateId, setUpdateId] = useState(null);
  const [onEdit, setOnEdit] = useState(false);

  const closeDeleteModalHandler = () => setShowDeleteModal(false);

  const showDeleteModalHandler = (requestId) => {
    setShowDeleteModal(true);
    setDeleteId(requestId);
  };

  const requestDeleteHandler = () => {
    deleteRequest(deleteId);
    history.push('/my-requests')
  }

  const requestUpdateHandler = (formValues) => {
    updateRequest(updateId, formValues)
  }

  useEffect(() => {

    fetchRequestDetail(props.match.params.requestId)

  }, [fetchRequestDetail, props.match.params.requestId])


  let request_detail = {}
  if (!loading && request) {
    request_detail = (
      <tbody>
        <tr><td>Request #</td><td>{request.id}</td></tr>
        <tr><td >Request Status</td><td style={
          { color: requestStatus.request_status_style[request.status] }}>{request.status}</td></tr>
        <tr><td>Created Date</td><td>{new Date(request.created_date).toLocaleDateString()}</td></tr>
        <tr><td>Phone</td><td>{request.phone}</td></tr>
        <tr><td>Address</td><td>{`${request.address1} ${request.address2}, ${request.city}, WA ${request.zip_code}`}</td></tr>
        <tr><td>Locations</td><td>{request.locations}</td></tr>
        <tr><td>Contact Preference</td><td>{request.contact_preference}</td></tr>
        <tr><td>Prefered Foods</td><td>{request.prefered_food}</td></tr>
        <tr><td>List of Items</td><td style={{ width: '80%' }}>{request.items_list}</td></tr>
        <tr><td>Food Restrictions</td><td>{request.food_restrictions}</td></tr>
        <tr><td>Urgency</td><td>{request.urgency}</td></tr>
        <tr><td>Household Size</td><td>{request.household_number}</td></tr>
        <tr><td>Financial Support</td><td>{request.financial_support}</td></tr>
        <tr><td>Special Info</td><td>{request.special_info}</td></tr>
        <tr><td>Share Info with Volunteer</td><td>{request.share_info ? "Yes" : "No"}</td></tr>
        <tr><td>Checkin</td><td>{request.need_checkin}</td></tr>
        <tr><td>Extra Info</td><td>{request.extra_info}</td></tr>
        <tr><td>Mutual Aid Pod</td><td>{request.ma_pod_setup ? "Yes" : "No"}</td></tr>
        <tr><td>Resources Offer</td><td>{request.offer_resources}</td></tr>
      </tbody>
    )
  }

  return (
    <Requests name={name}>
      <DeleteModal showDeleteModal={showDeleteModal} closeModalHandler={closeDeleteModalHandler} deleteHandler={requestDeleteHandler} label="Request" />
      {onEdit ? <UpdateRequestSupport
        onEdit={onEdit}
        setOnEdit={setOnEdit}
        updateRequest={requestUpdateHandler}
        requestData={request}
      />
        : <Container fluid>
          <h3>My Request Detail</h3>
          {loading
            ? <Spinner animation="grow" />
            : <Aux>
              <Table striped bordered hover size="sm">
                {request_detail}
              </Table>

              {request.status === requestStatus.NEW
                ? <div>
                  <Button
                    variant='primary'
                    className='mr-2'
                    size="lg"
                    onClick={() => {
                      setOnEdit(true);
                      setUpdateId(request.id)
                    }}
                  >Edit</Button>
                  <Button
                    variant='danger'
                    size="lg"
                    onClick={() => showDeleteModalHandler(request.id)}>Delete</Button>
                </div>
                : request.status === requestStatus.TRANSFERRED
                  ? <Button style={{ backgroundColor: "#342452", borderColor: "#342452" }} variant='info' disabled >Request transferred</Button>
                  : request.status === requestStatus.COMPLETED
                    ? <Button variant='success' disabled >Request is completed</Button>
                    : <Button variant='warning' disabled >Request is in process...</Button>
              }
            </Aux>
          }
        </Container>}
    </Requests>
  );
};

const mapStateToProps = (state) => {
  return {
    hasLogin: state.auth.access !== null,
    loading: state.requestDetail.loading,
    request: state.requestDetail.request,
    name: state.auth.name,
    error: state.requestDetail.error,
  }
}

export default connect(mapStateToProps, { fetchRequestDetail, deleteRequest, updateRequest })(RequestDetail);