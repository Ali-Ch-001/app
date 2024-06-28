


const SwitchRoute = ({ elementIfAuthenticated, elementIfNotAuthenticated, isAuthenticated }) => {
 
  return isAuthenticated ? elementIfAuthenticated : elementIfNotAuthenticated;
};

export default SwitchRoute;
