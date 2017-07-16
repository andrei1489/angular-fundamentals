import { Component, OnInit, Inject } from '@angular/core'
import { FormControl,FormGroup,Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from './auth.service'
import { TOASTR_TOKEN, Toastr} from '../common/toastr.service'
@Component({
  templateUrl:'app/user/profile.component.html',
  styles:[
    `
    em {float:right; color: #E05C65; padding-left:10px;}
    .error input {background-color: #E3C3C5}
    .error ::-webkit-input-placeholder { color: #999;}
    .error ::-moz-placeholder { color: #999;}
    .error :-moz-placeholder { color: #999; }
    .error :ms-input-placeholder { color: #999; }
    `
  ]
})
export class ProfileComponent implements OnInit {
  profileForm:FormGroup
  private firstName:FormControl
  private lastName:FormControl
  constructor(private router:Router, private authService:AuthService,
      @Inject(TOASTR_TOKEN) private toastr:Toastr){

  }
  
  ngOnInit(){
    this.firstName = new FormControl(this.authService.currentUser.firstName,Validators.required);
    this.lastName = new FormControl(this.authService.currentUser.lastName,Validators.required);
     this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    })
  }

  cancel(){
    this.router.navigate(["events"]);
  }

  saveProfile(formValues){
    if (this.profileForm.valid){
      this.authService.updateUser(formValues.firstName,formValues.lastName).subscribe( () =>{
        this.toastr.success("Changes made succesfully!");
      })
      
    }
  }
  validateLastName(){
    return this.lastName.valid || this.lastName.untouched
  }
  validateFirstName(){
    return this.firstName.valid || this.firstName.untouched
  }
  logout(){
    this.authService.logout().subscribe(() => {
      this.router.navigate(["events"])
    })
  }
}