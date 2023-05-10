import { UserService } from "./../../services/user.service";
import {
  Component,
  OnChanges,
  ViewChild,
  OnInit,
  ElementRef,
  Input,
  NgZone,
} from "@angular/core";
import { Router } from "@angular/router";
import { Iuser } from "src/app/models/iuser";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import {
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders,
} from "ng2-file-upload";
import { Cloudinary } from "@cloudinary/angular-5.x";

@Component({
  selector: "app-add-new-user",
  templateUrl: "./add-new-user.component.html",
  styleUrls: ["./add-new-user.component.scss"],
})
// implements OnInit
export class AddNewUserComponent {
  @Input()
  responses: Array<any> | undefined;
  resp: any;

  // private hasBaseDropZoneOver: boolean = false;
  // private uploader: FileUploader | undefined;
  // private title: string | undefined;
  userFormGroup: FormGroup;
  newUser: Iuser = {} as Iuser;
  successMessage: string = "";
  errMessage: string = "";
  file: any;

  // registerForm: FormGroup | undefined;

  aa = [
    {
      name: "true",
    },
    {
      name: "false",
    },
  ];
  roleList = [
    {
      name: "admin",
    },
    {
      name: "sub-admin",
    },
    {
      name: "user",
    },
  ];

  @ViewChild("form") form: NgForm | undefined;
  @ViewChild("fileInput", { static: false }) fileInput: ElementRef | undefined;
  constructor(
    private router: Router,
    private UserService: UserService, // private formBulider: FormBuilder
    private formBulider: FormBuilder, // private cloudinary: Cloudinary, // private zone: NgZone, // private http: HttpClient
    private http: HttpClient
  ) {
    // this.responses = [];
    // this.title = "";
    this.userFormGroup = this.formBulider.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9_.+-]{3,20}@(yahoo|gmail|outlook)(.com)$"
          ),
        ],
      ],
      phone: this.formBulider.array([
        this.formBulider.control("", [Validators.minLength(11)]),
      ]),
      address: this.formBulider.group({
        city: ["", Validators.required],
        street: ["", Validators.required],
        postalCode: ["", Validators.required],
      }),
      role: ["", Validators.required],
      image: [""],
      isActive: ["", Validators.required],

      password: ["", [Validators.minLength(8), Validators.required]],
      confirmPassword: ["", [Validators.minLength(8), Validators.required]],
    });
  }

  get name() {
    return this.userFormGroup.get("name");
  }
  get email() {
    return this.userFormGroup.get("email");
  }
  get image() {
    return this.userFormGroup.get("image");
  }

  get phone() {
    return this.userFormGroup.get("phone") as FormArray;
  }

  get city() {
    return this.userFormGroup.get("address")?.get("city");
  }
  get street() {
    return this.userFormGroup.get("address")?.get("street");
  }
  get postalCode() {
    return this.userFormGroup.get("address")?.get("postalCode");
  }
  get role() {
    return this.userFormGroup.get("role");
  }
  get isActive() {
    return this.userFormGroup.get("isActive");
  }
  get password() {
    return this.userFormGroup.get("password");
  }
  get confirmPassword() {
    return this.userFormGroup.get("confirmPassword");
  }

  addMobile() {
    this.phone.push(this.formBulider.control(""));
  }
  removeMobile(i: number) {
    this.phone.removeAt(i);
  }

  addNewUseer() {
    const observer = {
      next: (newUser: Iuser) => {
        this.successMessage = "user added succefully";
        setTimeout(() => {
          this.successMessage = "";
          if (this.newUser.role === "user") {
            this.router.navigateByUrl("/users");
          } else {
            this.router.navigateByUrl("/sub-admin");
          }
        }, 3000);
      },
      error: (err: Error) => {
        this.errMessage = "Email is already in use";
        setTimeout(() => {
          this.errMessage = "";
        }, 3000);
        // alert(err.message);
      },
    };
    // this.UserService.addNewUser(this.userFormGroup.value).subscribe(observer);
  }
  close() {
    this.successMessage = "";
    // location.reload();
  }
  confirmPasswordMatch(controlName: string, matchingControlName: string) {
    return (FormGroup: FormGroup) => {
      const control = FormGroup.controls[controlName];
      const matchingControl = FormGroup.controls[matchingControlName];

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  // uploadImg() {
  //   const imageBlob = this.fileInput?.nativeElement.files[0];
  //   console.log(imageBlob);
  //   const file = new FormData();
  //   file.set("file", imageBlob);
  //   console.log(file);
  // }
  getFile(event: any) {
    console.log(event);
    this.file = event.target.files[0];
    console.log(this.file);
  }
  upload() {
    this.newUser = this.userFormGroup.value;
    console.log(this.newUser);

    let formData = new FormData();
    formData.append("file", this.file);
    formData.append("upload_preset", "amazonUsersImgs");
    this.http
      .post("https://api.cloudinary.com/v1_1/did9zludc/upload", formData)
      .subscribe((res) => {
        // console.log(res);
        this.resp = res;
        // console.log(this.resp.url);
        this.newUser.image = this.resp.url;
        console.log(this.newUser.image);
        const observer = {
          next: (newUser: Iuser) => {
            console.log(this.newUser);

            this.successMessage = "user added succefully";
            setTimeout(() => {
              this.successMessage = "";
              if (this.newUser.role === "user") {
                this.router.navigateByUrl("/users");
              } else {
                this.router.navigateByUrl("/sub-admin");
              }
            }, 3000);
          },
          error: (err: any) => {
            console.log(err);
            this.errMessage = err.error.errors.msg;
            setTimeout(() => {
              this.errMessage = "";
            }, 5000);
            // alert(err.message);
          },
        };
        this.UserService.addNewUser(this.newUser).subscribe(observer);
      });
  }
}
// did9zludc
// 851699978387332
// T1QHtouqyP_Ln8L6wiixRlfWOKY
// amazonUsersImgs
// https://api.cloudinary.com/v1_1/${did9zludc}/upload
