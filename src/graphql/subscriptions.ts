/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount(
    $filter: ModelSubscriptionAccountFilterInput
    $owner: String
  ) {
    onCreateAccount(filter: $filter, owner: $owner) {
      id
      name
      email
      phone
      city
      voluntary
      address
      zip
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount(
    $filter: ModelSubscriptionAccountFilterInput
    $owner: String
  ) {
    onUpdateAccount(filter: $filter, owner: $owner) {
      id
      name
      email
      phone
      city
      voluntary
      address
      zip
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount(
    $filter: ModelSubscriptionAccountFilterInput
    $owner: String
  ) {
    onDeleteAccount(filter: $filter, owner: $owner) {
      id
      name
      email
      phone
      city
      voluntary
      address
      zip
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
