import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserComponent } from "./components/user/user.component";
import { AddNewUserComponent } from "./components/add-new-user/add-new-user.component";
import { UpdateUserAndShowDetailsComponent } from "./components/update-user-and-show-details/update-user-and-show-details.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SubAdminComponent } from "./components/sub-admin/sub-admin.component";
import {
  CloudinaryModule,
  CloudinaryConfiguration,
} from "@cloudinary/angular-5.x";
import { Cloudinary } from "cloudinary-core";
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddNewUserComponent,
    UpdateUserAndShowDetailsComponent,
    SubAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CloudinaryModule.forRoot({ Cloudinary }, {
      cloud_name: "did9zludc",
    } as CloudinaryConfiguration),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
