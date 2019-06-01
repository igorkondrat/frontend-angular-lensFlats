import {RouterModule, Routes} from '@angular/router';
import {RegistrationComponent} from './Components/registration/registration.component';
import {LoginComponent} from './Components/login/login.component';
import {AppComponent} from './app.component';
import {FlatComponent} from './Components/flat/flat.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UiModule} from './Components/ui/ui.module';
import {FlatsViewComponent} from './Components/flats-view/flats-view.component';
import {DashboardComponent} from './Components/account/dashboard.component';
import {HeaderComponent} from './Components/ui/header/header.component';
import {ChangePhotoComponent} from './Components/account/change-photo/change-photo.component';
import {UsersFlatsComponent} from './Components/account/users-flats/users-flats.component';
import {AboutUserComponent} from './Components/account/about-user/about-user.component';
import {ChangePasswordComponent} from './Components/account/change-password/change-password.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {UsersFlatEditComponent} from './Components/account/users-flats/users-flat-edit/users-flat-edit.component';
import {NgXCreditCardsModule} from 'ngx-credit-cards';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {GooglePlacesDirective} from './google-places.directive';
import {AgmCoreModule} from '@agm/core';
import {Ng5SliderModule} from 'ng5-slider';
import {ShowHidePasswordModule} from 'ngx-show-hide-password';
import { ForgotPasswordComponent } from './Components/login/forgot-password/forgot-password.component';

const rootRoutes: Routes = [
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'propertyList', component: FlatComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    FlatComponent,
    FlatsViewComponent,
    DashboardComponent,
    ChangePhotoComponent,
    UsersFlatsComponent,
    AboutUserComponent,
    ChangePasswordComponent,
    UsersFlatEditComponent,
    GooglePlacesDirective,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    RouterModule.forRoot(rootRoutes),
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    NgxPaginationModule,
    ShowHidePasswordModule.forRoot(),
    NgXCreditCardsModule,
    Ng5SliderModule,
    BsDatepickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqWVKlXaSPD8KcHQ0ncNl5qcxglyBlnyI',
      libraries: ['places']
    })
  ],
  providers: [LoginComponent, HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
