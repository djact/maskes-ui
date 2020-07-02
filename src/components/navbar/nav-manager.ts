import Home from '../home/Home';
import GetHelp from '../get-help/GetHelp';
import Volunteer from '../volunteer/Volunteer';
import MyRequests from '../manage-requests/manage-request-page/ManageRequests';
import CreateRequestPage from '../manage-requests/create-request-page/CreateRequestPage';

const PUBLIC_NAV_STATE = {
  '/': Home,
  '/get-help': GetHelp,
  '/volunteer': Volunteer,
  "/my-requests": MyRequests,
};

// TODO: handle full nav state here
const PROTECTED_NAV_STATE = {
  '/create-request': CreateRequestPage,
};

export function getDisplayComponentForNav(hasLogin, navId, subNavId) {
  const navState = subNavId + navId;
  if (hasLogin) {
    return PROTECTED_NAV_STATE[navState] || MyRequests;
  } else {
    return PUBLIC_NAV_STATE[navState] || Home;
  }
}
