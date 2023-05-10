import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Router } from "@angular/router";
import { NotFoundError } from "rxjs";
import { Iuser } from "src/app/models/iuser";
import { UserService } from "src/app/services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-sub-admin",
  templateUrl: "./sub-admin.component.html",
  styleUrls: ["./sub-admin.component.scss"],
})
export class SubAdminComponent implements OnInit {
  private httpOptions = {};
  receivedUsrsList: any[] = [];
  namesList: any[] = [];
  pageNumber: number = 0;
  selectedRole = "";
  errMessage: string = "";
  successMessage: string = "";
  searchValue = "";
  numOfPages: number = 1;
  pages: Array<any> = [];
  page: number = 1;
  limit: number = 4;
  isIcon1: boolean = true;
  role = "";
  roleList = [
    {
      name: "admin",
    },
    {
      name: "sub-admin",
    },
  ];
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
      `http://localhost:8000/users?role=admin&role=sub-admin&page=${this.page}&limit=${this.limit}`,
      this.httpOptions
    ).subscribe((response) => {
      this.receivedUsrsList = response.data;
      this.namesList = response.data;
      this.numOfPages = response.paginationResult.numberOfPages;
      this.pages = new Array(this.numOfPages);
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
  searchByName() {
    if (this.searchValue) {
      this.HttpClient.get<any>(
        `http://localhost:8000/users?role=admin&role=sub-admin&[keyword]=${this.searchValue}`,
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
    }
  }
  close() {
    this.errMessage = "";
    this.successMessage = "";
  }
  perv() {
    this.page = this.page - 1;
    // location.reload();
    this.HttpClient.get<any>(
      `http://localhost:8000/users?role=admin&role=sub-admin&page=${this.page}&limit=${this.limit}`,
      this.httpOptions
    ).subscribe((response) => {
      this.receivedUsrsList = response.data;
    });
  }
  next() {
    this.page = this.page + 1;
    // location.reload();
    if (this.role === "") {
      this.HttpClient.get<any>(
        `http://localhost:8000/users?role=admin&role=sub-admin&page=${this.page}&limit=${this.limit}`,
        this.httpOptions
      ).subscribe((response) => {
        this.receivedUsrsList = response.data;
      });
    } else {
      this.HttpClient.get<any>(
        `http://localhost:8000/users?role=${this.role}&page=${this.page}&limit=${this.limit}`,
        this.httpOptions
      ).subscribe((response) => {
        this.receivedUsrsList = response.data;
      });
    }
  }
  filterRole(role: any) {
    if (role == 0) {
      this.HttpClient.get<any>(
        `http://localhost:8000/users?role=admin&role=sub-admin&page=${this.page}&limit=${this.limit}`,
        this.httpOptions
      ).subscribe((response) => {
        this.receivedUsrsList = response.data;
        this.numOfPages = response.paginationResult.numberOfPages;
      });
    } else {
      this.role = role;
      this.HttpClient.get<any>(
        `http://localhost:8000/users?role=${role}&page=${this.page}&limit=${this.limit}`,
        this.httpOptions
      ).subscribe((response) => {
        this.receivedUsrsList = response.data;
        this.numOfPages = response.paginationResult.numberOfPages;
      });
    }
  }
  setPage(i: any) {
    this.page = i;
    this.HttpClient.get<any>(
      `http://localhost:8000/users?role=admin&role=sub-admin&page=${this.page}&limit=${this.limit}`,
      this.httpOptions
    ).subscribe((response) => {
      this.receivedUsrsList = response.data;
    });
  }
  sortAZ() {
    this.HttpClient.get<any>(
      `http://localhost:8000/users?role=admin&role=sub-admin&sort=name&page=${this.page}&limit=${this.limit}`,
      this.httpOptions
    ).subscribe((response) => {
      this.receivedUsrsList = response.data;
    });
  }
  sortZA() {
    this.HttpClient.get<any>(
      `http://localhost:8000/users?role=admin&role=sub-admin&sort=-name&page=${this.page}&limit=${this.limit}`,
      this.httpOptions
    ).subscribe((response) => {
      this.receivedUsrsList = response.data;
    });
  }
  specifyLimit() {
    this.HttpClient.get<any>(
      `http://localhost:8000/users?role=admin&role=sub-admin&page=${this.page}&limit=${this.limit}`,
      this.httpOptions
    ).subscribe((response) => {
      this.receivedUsrsList = response.data;
      this.namesList = response.data;
      this.numOfPages = response.paginationResult.numberOfPages;
      this.pages = new Array(this.numOfPages);
    });
  }
  toggleIcon() {
    this.isIcon1 = !this.isIcon1;
  }
}
