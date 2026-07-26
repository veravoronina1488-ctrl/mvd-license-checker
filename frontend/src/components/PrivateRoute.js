import {Navigate} from 'react-router-dom';
function PrivateRoute({authToken, children}) {
  return authToken ? children : <Navigate to="/login" />;
}
export default PrivateRoute;