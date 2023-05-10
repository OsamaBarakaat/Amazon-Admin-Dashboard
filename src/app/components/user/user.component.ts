import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { Iuser } from "src/app/models/iuser";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  private httpOptions = {};
  receivedUsrsList: any[] = [];
  selectedRole = "";
  searchValue = "";
  errMessage: string = "";
  successMessage: string = "";
  numOfPages: number = 1;
  pages: Array<any> = [];
  page: number = 1;
  limit: number = 4;
  isIcon1: boolean = true;
  constructor(
    private HttpClient: HttpClient,
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
      `http://localhost:8000/users?role=user&page=${this.page}&limit=${this.limit}`,
      this.httpOptions
    ).subscribe((response) => {
      this.receivedUsrsList = response.data;
      this.numOfPages = response.paginationResult.numberOfPages;
      this.pages = new Array(this.numOfPages);
      console.log(this.receivedUsrsList);
    });
  }
  deleteUser(id: any) {
    Swal.fire({
      title: "Are You Want to Remove user?",

      text: "You will not be able to recover the user again",

      icon: "warning",
      showCancelButton: true,

      confirmButtonText: "Yes Delete it",

      cancelButtonText: "No Keep it",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Deleted", "user deleted succefully", "success");
        this.UserService.deleteUseer(id).subscribe();
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your user is Save", "error");
      }
      // location.reload();
    });
  }
  // deleteUser(id: any) {
  //   console.log(id);
  //   const observer = {
  //     next: (user: Iuser) => {
  //       this.successMessage = "user deleted succefully";
  //       // this.receivedUsrsList = this.receivedUsrsList.filter(
  //       //   (user) => user.id == id
  //       // );
  //       setTimeout(() => {
  //         this.successMessage = "";
  //         location.reload();
  //       }, 3000);
  //     },
  //     error: (err: Error) => {
  //       alert(err.message);
  //     },
  //   };
  //   return this.UserService.deleteUseer(id).subscribe(observer);
  // }
  searchByName() {
    if (this.searchValue) {
      this.HttpClient.get<any>(
        `http://localhost:8000/users?role=user&[keyword]=${this.searchValue}`,
        this.httpOptions
      ).subscribe((response) => {
        if (response.data.length === 0) {
          this.errMessage = "user not found!";
          setTimeout(() => {
            this.errMessage = "";
          }, 3000);
        }
        this.receivedUsrsList = response.data;
        console.log(this.receivedUsrsList);
      });
    } else {
      this.errMessage = "please enter name";
      setTimeout(() => {
        this.errMessage = "";
      }, 3000);
    }
  }
  close() {
    this.errMessage = "";
    this.successMessage = "";
    location.reload();
  }
  perv() {
    this.page = this.page - 1;
    // location.reload();
    this.HttpClient.get<any>(
      `http://localhost:8000/users?role=user&page=${this.page}&limit=${this.limit}`,
      this.httpOptions
    ).subscribe((response) => {
      this.receivedUsrsList = response.data;
    });
  }
  next() {
    this.page = this.page + 1;
    // location.reload();
    this.HttpClient.get<any>(
      `http://localhost:8000/users?role=user&page=${this.page}&limit=${this.limit}`,
      this.httpOptions
    ).subscribe((response) => {
      this.receivedUsrsList = response.data;
    });
  }
  setPage(i: any) {
    this.page = i;
    this.HttpClient.get<any>(
      `http://localhost:8000/users?role=user&page=${this.page}&limit=${this.limit}`,
      this.httpOptions
    ).subscribe((response) => {
      this.receivedUsrsList = response.data;
    });
  }
  sortAZ() {
    this.HttpClient.get<any>(
      `http://localhost:8000/users?role=user&sort=name&page=${this.page}&limit=${this.limit}`,
      this.httpOptions
    ).subscribe((response) => {
      this.receivedUsrsList = response.data;
    });
  }
  sortZA() {
    this.HttpClient.get<any>(
      `http://localhost:8000/users?role=user&sort=-name&page=${this.page}&limit=${this.limit}`,
      this.httpOptions
    ).subscribe((response) => {
      this.receivedUsrsList = response.data;
    });
  }
  specifyLimit() {
    this.HttpClient.get<any>(
      `http://localhost:8000/users?role=user&page=${this.page}&limit=${this.limit}`,
      this.httpOptions
    ).subscribe((response) => {
      this.receivedUsrsList = response.data;
      this.numOfPages = response.paginationResult.numberOfPages;
      this.pages = new Array(this.numOfPages);
      console.log(this.receivedUsrsList);
    });
  }
  toggleIcon() {
    this.isIcon1 = !this.isIcon1;
  }
}
