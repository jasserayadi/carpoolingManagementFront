import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from "./BackOffice/all-template-back/all-template-back.component";
import { HomeBackComponent } from "./BackOffice/home-back/home-back.component";
import { SidebarComponent } from "./BackOffice/sidebar/sidebar.component";
import { AllTemplateFrontComponent } from "./FrontOffice/all-template-front/all-template-front.component";
import { HomeFrontComponent } from "./FrontOffice/home-front/home-front.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {AddCarpoolingComponent} from "./BackOffice/add-carpooling/add-carpooling.component";
import {DisplayallCarpoolingsComponent} from "./BackOffice/displayall-carpoolings/displayall-carpoolings.component";
import {AddBookingComponent} from "./Booking/add-booking/add-booking.component";
import {DisplayAllBookingComponent} from "./Booking/display-all-booking/display-all-booking.component";
import {UpdateCarpoolingComponent} from "./BackOffice/update-carpooling/update-carpooling.component";

const routes: Routes = [

  {
    path: "",
    component: AllTemplateFrontComponent,
    children: [
      {
        path: "home",
        component: HomeFrontComponent,children: [ ]
      },

    ]
  },


  {
    path: "admin",
    component: AllTemplateBackComponent,
    children: [
      {
        path: "home",
        component: HomeBackComponent,children:[ {
          path: "addBooking",
          component: AddBookingComponent
        } ]
      }
    ]
  },

  {path:"add",
    component:FeedbackComponent},
  {path:"addCarpooling",
    component:AddCarpoolingComponent},
  {path:"displayCarpooling",
    component:DisplayallCarpoolingsComponent, children: [
      {
        path: "addBooking",
        component: AddBookingComponent
      },
    ]},{path:"allBooking",
    component:DisplayAllBookingComponent},{path:"allBooking",
    component:DisplayAllBookingComponent},
  {
    path: "carpooling/:carpoolingID", component: UpdateCarpoolingComponent
  },
  {
    path: "display",
    component: DisplayallCarpoolingsComponent,children: [



    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
