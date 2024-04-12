import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from "./BackOffice/all-template-back/all-template-back.component";
import { HomeBackComponent } from "./BackOffice/home-back/home-back.component";
import { SidebarComponent } from "./BackOffice/sidebar/sidebar.component";
import { AllTemplateFrontComponent } from "./FrontOffice/all-template-front/all-template-front.component";
import { HomeFrontComponent } from "./FrontOffice/home-front/home-front.component";
import {FeedbackComponent} from "./Components/user/feedback/feedback.component";
import {AddCarpoolingComponent} from "./Components/user/carpoolings/add-carpooling/add-carpooling.component";
import {DisplayallCarpoolingsComponent} from "./Components/user/carpoolings/displayall-carpoolings/displayall-carpoolings.component";
import {AddBookingComponent} from "./Components/user/Booking/add-booking/add-booking.component";
import {DisplayAllBookingComponent} from "./Components/user/Booking/display-all-booking/display-all-booking.component";
import {UpdateCarpoolingComponent} from "./Components/user/carpoolings/update-carpooling/update-carpooling.component";
import {
  DisplayAllCarpoolingsComponent
} from "./Components/admin/carpooling/display-all-carpoolings/display-all-carpoolings.component";
import {
  AdminDisplayAllBookingComponent
} from "./Components/admin/booking/admin-display-all-booking/admin-display-all-booking.component";
import {
  DisplayAllFeedbacksComponent
} from "./Components/admin/feedback/display-all-feedbacks/display-all-feedbacks.component";

const routes: Routes = [

  {
    path: "addFeedback",
    component:FeedbackComponent
  },
  {
    path: "allfeedback",
    component:DisplayAllFeedbacksComponent
  },
  {path: "HomeAdmin",
    component: HomeBackComponent},
  {path: "",
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
        path: "allCarpiilingsAdmin",
        component:DisplayAllCarpoolingsComponent,
      },
      {
        path: "AdminBooking",
        component:AdminDisplayAllBookingComponent,
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
