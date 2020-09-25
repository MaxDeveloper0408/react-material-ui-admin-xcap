import React,{Component} from 'react';
import { Switch, Redirect } from 'react-router-dom';

import AuthService from "./services/auth.service";

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  AdminDashboard as AdminDashboardView,
  UserDashboard as UserDashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  ActiveUserList as ActiveUserListView,
  UserEdit as UserEditView,
  UserPersonal as UserPersonalView,
  UserBank as UserBankView,
  UserPlan as UserPlanView,
  UserPlanCresci as UserPlanCresciView,
  UserIncome as UserIncomeView,
  UserDeposit as UserDepositView,
  UserWithdraw as UserWithdrawView,
  AdminPlan as AdminPlanView,
  AdminPlanCresc as AdminPlanCrescView,
  AdminContract as AdminContractView,
  AdminContractCresc as AdminContractCrescView,
  AdminDeposit as AdminDepositView,
  AdminCaseDeposit as AdminCaseDepositView,
  AdminWithdraw as AdminWithdrawView,
  UserPassword as UserPasswordView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  
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
          to="/userdashboard"
        />
        )}
        
        {AuthService.getCurrentUser() && (
        <RouteWithLayout
          component={UserDashboardView}
          exact
          layout={MainLayout}
          path="/userdashboard"
        />
        )}
        {AuthService.getCurrentUser() && AuthService.getCurrentUser().roles.includes("ROLE_ADMIN") && (
        <RouteWithLayout
          component={AdminDashboardView}
          exact
          layout={MainLayout}
          path="/admindashboard"
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
        {AuthService.getCurrentUser() && AuthService.getCurrentUser().roles.includes("ROLE_ADMIN") && (
        <RouteWithLayout
          component={AdminPlanView}
          exact
          layout={MainLayout}
          path="/adminplan"
        />
        )}
        {AuthService.getCurrentUser() && AuthService.getCurrentUser().roles.includes("ROLE_ADMIN") && (
            <RouteWithLayout
                component={AdminPlanCrescView}
                exact
                layout={MainLayout}
                path="/adminplancresc"
            />
        )}
        {AuthService.getCurrentUser() && AuthService.getCurrentUser().roles.includes("ROLE_ADMIN") && (
        <RouteWithLayout
          component={AdminContractView}
          exact
          layout={MainLayout}
          path="/admincontract"
        />
        )}
        {AuthService.getCurrentUser() && AuthService.getCurrentUser().roles.includes("ROLE_ADMIN") && (
          <RouteWithLayout
            component={AdminContractCrescView}
            exact
            layout={MainLayout}
            path="/admincontractcresc"
          />
        )}
        {AuthService.getCurrentUser() && AuthService.getCurrentUser().roles.includes("ROLE_ADMIN") && (
        <RouteWithLayout
          component={AdminDepositView}
          exact
          layout={MainLayout}
          path="/admindeposit"
        />
        )}
        {AuthService.getCurrentUser() && AuthService.getCurrentUser().roles.includes("ROLE_ADMIN") && (
        <RouteWithLayout
          component={AdminCaseDepositView}
          exact
          layout={MainLayout}
          path="/admincasedeposit"
        />
        )}
        {AuthService.getCurrentUser() && AuthService.getCurrentUser().roles.includes("ROLE_ADMIN") && (
        <RouteWithLayout
          component={AdminWithdrawView}
          exact
          layout={MainLayout}
          path="/adminwithdraw"
        />
        )}
        {AuthService.getCurrentUser() && AuthService.getCurrentUser().roles.includes("ROLE_ADMIN") && (
        <RouteWithLayout
          component={ActiveUserListView}
          exact
          layout={MainLayout}
          path="/active_users"
        />
        )}
        {AuthService.getCurrentUser() && AuthService.getCurrentUser().roles.includes("ROLE_ADMIN") && (
        <RouteWithLayout
          component={UserEditView}
          exact
          layout={MainLayout}
          path="/useredit/:userId"
        />
        )}
        {AuthService.getCurrentUser() && (
        <RouteWithLayout
          component={UserPersonalView}
          exact
          layout={MainLayout}
          path="/userpersonal"
        />
        )}
        {AuthService.getCurrentUser() && (
        <RouteWithLayout
          component={UserPasswordView}
          exact
          layout={MainLayout}
          path="/userpassword"
        />
        )}
        {AuthService.getCurrentUser() && (
        <RouteWithLayout
          component={UserBankView}
          exact
          layout={MainLayout}
          path="/userbank"
        />
        )}
        {AuthService.getCurrentUser() && (
        <RouteWithLayout
          component={UserPlanView}
          exact
          layout={MainLayout}
          path="/userplan_flexible"
        />
        )}
        {AuthService.getCurrentUser() && (
        <RouteWithLayout
          component={UserPlanView}
          exact
          layout={MainLayout}
          path="/userplan_flexible"
        />
        )}
        {AuthService.getCurrentUser() && (
        <RouteWithLayout
          component={UserPlanCresciView}
          exact
          layout={MainLayout}
          path="/userplan_crescimento"
        />
        )}
        {AuthService.getCurrentUser() && (
        <RouteWithLayout
          component={UserIncomeView}
          exact
          layout={MainLayout}
          path="/userincome"
        />
        )}
        {AuthService.getCurrentUser() && (
        <RouteWithLayout
          component={UserDepositView}
          exact
          layout={MainLayout}
          path="/userdeposit"
        />
        )}
        {AuthService.getCurrentUser() && (
        <RouteWithLayout
          component={UserWithdrawView}
          exact
          layout={MainLayout}
          path="/userwithdraw"
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
