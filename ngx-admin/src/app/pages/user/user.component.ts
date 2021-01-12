import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "app/services/login.service";

@Component({
  selector: "ngx-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  user: any;
  pass: any;
  token: any;
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}
  public Login() {
    var data = {
      Name: this.user,
      Password: this.pass,
    };
   
    this.loginService.getUser(data).subscribe((user: any) => {
      debugger;
      this.token = user.auth_token;
      localStorage.setItem("Token", user.auth_token);
      console.log(user);
    });
  }
}
