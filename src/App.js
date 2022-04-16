import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';
import Login from './Components/Login';
import PhoneSignin from './Components/PhoneSignin';
import DetailsForm from './Components/DetailsForm';
import Forgot from './Components/Forgot';
import Profile from './Components/Profile';
import Prodlist from './Components/Prodlist';
import Orders from './Components/Orders';
import Cart from './Components/Cart';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {AuthProvider,AuthContext} from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/login" component={Login} exact/>
          <Route path="/signup" component={Signup} exact/>
          <Route path="/phone" component={PhoneSignin} exact/>
          <Route path="/forgot" component={Forgot} exact/>
          <Route path="/profile" component={Profile} exact/>
          <Route path="/form" component={DetailsForm} exact/>
          <Route path="/cart" component={Cart} exact/>
          <Route path="/orders" component={Orders} exact/>
          <Route path="/" component={Prodlist} exact/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
