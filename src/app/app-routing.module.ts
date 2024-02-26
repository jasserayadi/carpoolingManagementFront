import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllTemplateBackComponent} from "./BackOffice/all-template-back/all-template-back.component";
import {HomeBackComponent} from "./BackOffice/home-back/home-back.component";
import {SidebarComponent} from "./BackOffice/sidebar/sidebar.component";
import {AllTemplateFrontComponent} from "./FrontOffice/all-template-front/all-template-front.component";

const routes: Routes = [

  {path:"m",
    component:AllTemplateFrontComponent},


  {path:"admin",
  component:AllTemplateBackComponent,
  children:[{
    path:"admin",component:HomeBackComponent
  }]}
  //,
  //{path:"admin/#",
  //component:SidebarComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
