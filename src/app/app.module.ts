import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { FooterComponent } from './BackOffice/footer/footer.component';
import { DynamicContentComponent } from './BackOffice/dynamic-content/dynamic-content.component';
import { NavbarComponent } from './BackOffice/navbar/navbar.component';
import { SidebarComponent } from './BackOffice/sidebar/sidebar.component';
import { HomeBackComponent } from './BackOffice/home-back/home-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { DynamicFrontComponent } from './FrontOffice/dynamic-front/dynamic-front.component';
import { HomeFrontComponent } from './FrontOffice/home-front/home-front.component';
import  {HttpClientModule} from "@angular/common/http";
import { FeedbackComponent } from './Components/admin/feedback/feedback.component';
import { AddCarpoolingComponent } from './Components/user/carpoolings/add-carpooling/add-carpooling.component';
import { DisplayallCarpoolingsComponent } from './Components/user/carpoolings/displayall-carpoolings/displayall-carpoolings.component';
import { AddBookingComponent } from './Components/user/Booking/add-booking/add-booking.component';
import { DisplayAllBookingComponent } from './Components/user/Booking/display-all-booking/display-all-booking.component';
import { UpdateCarpoolingComponent } from './Components/user/carpoolings/update-carpooling/update-carpooling.component';

@NgModule({
  declarations: [
    AppComponent,
    AllTemplateBackComponent,
    FooterComponent,
    DynamicContentComponent,
    NavbarComponent,
    SidebarComponent,
    HomeBackComponent,
    AllTemplateFrontComponent,
    FooterFrontComponent,
    HeaderFrontComponent,
    DynamicFrontComponent,
    HomeFrontComponent,
    FeedbackComponent,
    AddCarpoolingComponent,
    DisplayallCarpoolingsComponent,
    AddBookingComponent,
    DisplayAllBookingComponent,
    UpdateCarpoolingComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

    FormsModule,



  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
