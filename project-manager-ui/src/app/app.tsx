import Login from './modules/user-authentication/login';
import Logout from './modules/user-authentication/logout';
import SignUp from './modules/user-authentication/signup';

export function App() {
  return (
    <>
      <Login></Login>
      <SignUp></SignUp>
      <Logout></Logout>
    </>
  );
}

export default App;
