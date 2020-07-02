import Home from '../home/Home';
import GetHelp from '../get-help/GetHelp';
import Volunteer from '../volunteer/Volunteer';
import MyRequests from '../manage-requests/ManageRequests';

const PUBLIC_NAV_STATE = {
  '/': Home,
  '/get-help': GetHelp,
  '/volunteer': Volunteer,
  "/my-requests": MyRequests,
};

const PROTECTED_NAV_STATE = {};

export function getDisplayComponentForNav(hasLogin, navId) {
  if (hasLogin) {
    return PROTECTED_NAV_STATE[navId] || MyRequests;
  } else {
    return PUBLIC_NAV_STATE[navId] || Home;
  }
}
