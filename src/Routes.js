import React,{Component} from 'react';
import { Switch, Redirect } from 'react-router-dom';

import AuthService from "./services/auth.service";

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from './views';


class Routes extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showUserBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
    
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: AuthService.getCurrentUser(),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showUserBoard: user.roles.includes("ROLE_USER")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard, showUserBoard } = this.state;
    console.log(showUserBoard)
    return (
      <Switch>
        {!AuthService.getCurrentUser() && (
          <Redirect
          exact
          from="/"
          to="/sign-in"
        />
        )}

        {AuthService.getCurrentUser() && (
        <Redirect
          exact
          from="/"
          to="/dashboard"
        />
        )}
        
        {AuthService.getCurrentUser() && (
        <RouteWithLayout
          component={DashboardView}
          exact
          layout={MainLayout}
          path="/dashboard"
        />
        )}
        {AuthService.getCurrentUser() && AuthService.getCurrentUser().roles.includes("ROLE_ADMIN") && (
        <RouteWithLayout
          component={UserListView}
          exact
          layout={MainLayout}
          path="/users"
        />
        )}
        {(showAdminBoard || currentUser) && (
        <RouteWithLayout
          component={ProductListView}
          exact
          layout={MainLayout}
          path="/products"
        />
        )}
        {(showAdminBoard || currentUser) && (
        <RouteWithLayout
          component={TypographyView}
          exact
          layout={MainLayout}
          path="/typography"
        />
        )}
        {(showAdminBoard || currentUser) && (
        <RouteWithLayout
          component={IconsView}
          exact
          layout={MainLayout}
          path="/icons"
        />
        )}
        {(showAdminBoard || currentUser) && (
        <RouteWithLayout
          component={AccountView}
          exact
          layout={MainLayout}
          path="/account"
        />
        )}
        {(showAdminBoard || currentUser) && (
        <RouteWithLayout
          component={SettingsView}
          exact
          layout={MainLayout}
          path="/settings"
        />
        )}
        
        <RouteWithLayout
          component={SignUpView}
          exact
          layout={MinimalLayout}
          path="/sign-up"
        />
        
        {!AuthService.getCurrentUser() && (
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MinimalLayout}
          path="/sign-in"
        />
        )}

        <RouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          path="/not-found"
        />
        {/* <Redirect to="/not-found" /> */}
      </Switch>
    );
  }

}

export default Routes;