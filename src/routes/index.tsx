import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dashboard from '../pages/Dashboard';
import ForgotPassword from '../pages/ForgotPassword';
import SignIn from '../pages/Sign-in';
import SignUp from '../pages/Sign-up';
import ResetPassword from '../pages/ResetPassword';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} isPrivate />
    <Route path="/signup" component={SignUp} isPrivate />
    <Route path="/forgot-password" component={ForgotPassword} isPrivate />
    <Route path="/reset-password" component={ResetPassword} isPrivate />

    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
