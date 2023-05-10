import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./components/user/user.component";
import { AddNewUserComponent } from "./components/add-new-user/add-new-user.component";
import { UpdateUserAndShowDetailsComponent } from "./components/update-user-and-show-details/update-user-and-show-details.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { SubAdminComponent } from "./components/sub-admin/sub-admin.component";

const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    title: "all users",
  },
  {
    path: "users",
    component: UserComponent,
    title: "all Users",
  },
  {
    path: "sub-admin",
    component: SubAdminComponent,
    title: "all admins",
  },
  {
    path: "addNewUser",
    component: AddNewUserComponent,
    title: "Add new user",
  },
  {
    path: "updateAndShow/:id",
    component: UpdateUserAndShowDetailsComponent,
    title: "Update and show Details",
  },
  {
    path: "**",
    component: NotFoundComponent,
    title: "not found",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
