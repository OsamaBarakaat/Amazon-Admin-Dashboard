import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-update-user-and-show-details",
  templateUrl: "./update-user-and-show-details.component.html",
  styleUrls: ["./update-user-and-show-details.component.scss"],
})
export class UpdateUserAndShowDetailsComponent implements OnInit {
  id = this.actRoute.snapshot.params["id"];
  user: any = {};
  private httpOptions = {};
  constructor(
    private HttpClient: HttpClient,
    public actRoute: ActivatedRoute,
    private router: Router,
    private UserService: UserService
  ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDM2MmJlNDYzZjA3ZjE3OTYzNmJmZTYiLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNjgxMzgyMDcyfQ.VRR-r6WGrCS_wTRgN4hmbhw7jYvxGCApDLFrW3GnU0c",
      }),
    };
  }
  ngOnInit(): void {
    this.HttpClient.get<any>(
      `http://localhost:8000/users/${this.id}`,
      this.httpOptions
    ).subscribe((response) => {
      this.user = response.data;
      console.log(this.user);
    });
  }
  goBack() {
    window.history.back();
  }
}
