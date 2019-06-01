import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout/layout.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from '../registration/registration.component';
import {LoginComponent} from '../login/login.component';
import {FlatComponent} from '../flat/flat.component';
import {AuthGuard} from '../../Services/guards/auth.guard';
import {DashboardComponent} from '../account/dashboard.component';
import {AppComponent} from '../../app.component';
import {ChangePhotoComponent} from '../account/change-photo/change-photo.component';
import {UsersFlatsComponent} from '../account/users-flats/users-flats.component';
import {AboutUserComponent} from '../account/about-user/about-user.component';
import {ChangePasswordComponent} from '../account/change-password/change-password.component';
import {UsersFlatEditComponent} from '../account/users-flats/users-flat-edit/users-flat-edit.component';
import {NgXCreditCardsModule} from 'ngx-credit-cards';
import {FlatsViewCurrentComponent} from '../flats-view-current/flats-view-current.component';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {DatepickerRangeComponent} from '../datepicker-range/datepicker-range.component';
import {MessagesComponent} from '../account/messages/messages.component';
import {SingleMessageComponent} from '../account/messages/single-message/single-message.component';
import {CreateMessageComponent} from '../account/messages/create-message/create-message.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgmCoreModule} from '@agm/core';
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {ShowHidePasswordModule} from 'ngx-show-hide-password';
import {ForgotPasswordComponent} from '../login/forgot-password/forgot-password.component';


const rootRoutes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'propertyList', component: FlatComponent, canActivate: [AuthGuard]},
  {path: 'flatsViewCurrent/:flatId', component: FlatsViewCurrentComponent},

  {
    path: 'property',
    component: UsersFlatsComponent,
    canActivate: [AuthGuard],
    children: [{path: 'userFlatEdit/:flatId', component: UsersFlatEditComponent}]
  },
  {
    path: 'account',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [{path: 'changePassword', component: ChangePasswordComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'singleMessage/:messageId', component: SingleMessageComponent},
      {path: 'createMessage', component: CreateMessageComponent},
      {
        path: 'aboutUser',
        component: AboutUserComponent,
        children: [{path: 'changePhoto', component: ChangePhotoComponent}]
      }]
  },
];

@NgModule({
  declarations: [LayoutComponent,
    HeaderComponent,
    FooterComponent,
    FlatsViewCurrentComponent,
    DatepickerRangeComponent,
    MessagesComponent,
    CreateMessageComponent,
    SingleMessageComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(rootRoutes),
    NgXCreditCardsModule,
    NgbDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    ShowHidePasswordModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqWVKlXaSPD8KcHQ0ncNl5qcxglyBlnyI',
      libraries: ['places']
    }),
    GooglePlaceModule
  ],
  exports: [LayoutComponent],
  providers: [LoginComponent,
    HeaderComponent,
    AppComponent,
    DashboardComponent,
    AboutUserComponent,
    UsersFlatEditComponent,
    FlatsViewCurrentComponent,
    SingleMessageComponent,
    CreateMessageComponent]
})
export class UiModule {
}
