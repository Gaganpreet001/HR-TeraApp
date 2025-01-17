import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { Page1Component } from './pages/page1/page1.component';
import { ItemListComponent } from './pages/item-list/item-list.component';
import { ItemAEComponent } from './pages/item-ae/item-ae.component';
import { LogisticsListComponent } from './pages/logistics-list/logistics-list.component';
import { AuthGuard } from './Services/auth.guard';
import { ProformaListComponent } from './pages/proforma-list/proforma-list.component';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { FinancialYearListComponent } from './pages/financial-year-list/financial-year-list.component';
import { MenuListComponent } from './pages/menu-list/menu-list.component';
import { SelectCompanyYearComponent } from './components/select-company-year/select-company-year.component';
import { GeneralSettingsComponent } from './pages/general-settings/general-settings.component';
import { RolePermissionsComponent } from './pages/role-permissions/role-permissions.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserAEComponent } from './pages/user-ae/user-ae.component';
import { CustomerListComponent } from './pages/customer-list/customer-list.component';
import { CustomerAeComponent } from './pages/customer-ae/customer-ae.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'selectSession', component: SelectCompanyYearComponent,canActivate: [AuthGuard] },
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [AuthGuard] ,
    data: { breadcrumb: 'Masters' },
    children: [
      { path: 'home', component: HomeComponent,canActivate: [AuthGuard] , data:{breadcrumb: 'Home'} },
      { path: 'page1', component: Page1Component ,canActivate: [AuthGuard] , data:{breadcrumb: 'Page'}},
      { path: 'ItemAE', component: ItemAEComponent,canActivate: [AuthGuard], data:{breadcrumb: 'Item'}},
      { path: 'ItemAE/:id', component: ItemAEComponent,canActivate: [AuthGuard], data:{breadcrumb: 'ItemAE'}},
      { path: 'ItemList', component: ItemListComponent ,canActivate: [AuthGuard], data:{breadcrumb: 'ItemList'}},
      { path: 'LogisticsList', component: LogisticsListComponent ,canActivate: [AuthGuard], data:{breadcrumb:'LogisticsList'}},
      { path: 'ProformaList', component: ProformaListComponent ,canActivate: [AuthGuard], data:{breadcrumb:'ProformaList'}},
      { path: 'CompanyList', component: CompanyListComponent ,canActivate: [AuthGuard], data:{breadcrumb:'Companies List'}},
      { path: 'RoleList', component: RoleListComponent ,canActivate: [AuthGuard], data:{breadcrumb:'Roles List'}},
      { path: 'FinancialYearList', component: FinancialYearListComponent ,canActivate: [AuthGuard], data:{breadcrumb:'Financial Year List'}},
      { path: 'MenuList', component: MenuListComponent,canActivate: [AuthGuard], data:{breadcrumb:'Menu List'}},
      { path: 'Settings', component: GeneralSettingsComponent,canActivate: [AuthGuard], data:{breadcrumb:'General Settings'}},
      { path: 'RolePermissions', component: RolePermissionsComponent,canActivate: [AuthGuard], data:{breadcrumb:'Role Permissions'}},
      { path: 'UserList', component: UserListComponent ,canActivate: [AuthGuard], data:{breadcrumb:'User List'},},
      { path: 'UserAE', component: UserAEComponent,canActivate: [AuthGuard], data:{breadcrumb: 'User Add'}},
      { path: 'UserAE/:id', component: UserAEComponent,canActivate: [AuthGuard], data:{breadcrumb: 'User Edit'}},
      { path: 'CustomerList', component: CustomerListComponent,data:{breadcrumb: 'Customer List'}},
      { path: 'CustomerAE', component: CustomerAeComponent,data:{breadcrumb: 'Customer Add'}},
      




    ],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
