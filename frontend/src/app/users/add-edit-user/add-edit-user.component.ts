import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  public addEditUserForm: FormGroup;
  public editUserId:any;
  public isEdit:boolean;
  public title:string;
  public formSubmitted = false;

   constructor(public fb: FormBuilder,public route: ActivatedRoute, public router: Router, public userService: UsersService) { 
    this.initializeAddEditUserForm(fb);
  }

  ngOnInit() {
    var labid = localStorage.getItem('labid');
    this.route.params.subscribe(params => {
      if(params['id']!=undefined){
        this.isEdit=true;
        this.editUserId=params['id'];
        this.getUserDetails(this.editUserId);
        this.title = "Edit User";
      } else {
        this.isEdit=false;
        this.title = "New User";
      }
    });
  }

  initializeAddEditUserForm(fb){
    this.route.params.subscribe(params => {
        this.addEditUserForm = fb.group({
          name:["",Validators.required],
          email:["",Validators.required],
          username:["",Validators.required],
          website:["",Validators.required], 
          phone:["",Validators.required], 
          address:fb.group({
            street: [""],
            suite: [""],
            city: [""],
            zipcode: [""]
          }),
          company: fb.group({
            name: [""],
            catchPhrase:[""],
            bs: [""]
          })
        });
    });
  }

  getUserDetails(userid) {
    var self=this;
    this.userService.viewUserById(userid).then(res => {
      console.log(res)
      // if(res.Response == "Success") {
        // var result = res.data;
          //Patching value with Html
          self.addEditUserForm.patchValue({
            name:res.name,
            email:res.email,
            username:res.username,
            website:res.website, 
            phone:res.phone, 
            address:{
              street: res.address.street,
              suite: res.address.suite,
              city: res.address.city,
              zipcode: res.address.zipcode
            },
            company: {
              name: res.company.name,
              catchPhrase:res.company.catchPhrase,
              bs: res.company.bs
            }
          })
        // } else {
        // }
      });
    
  }


  onSubmit() {
    this.formSubmitted = true;
    console.log(this.formSubmitted);
    if(this.addEditUserForm.valid) {
      console.log(this.addEditUserForm.value);
      var data = this.addEditUserForm.value;
      var self = this;
      this.userService.saveUser(data).then(function(res) {
        console.log(res);
        if(res.id) {
          self.router.navigate(['/users']);
        } else {
        }
      });
    }
  }

  onUpdate() {
    this.formSubmitted = true;
    console.log(this.editUserId);
   
    if(this.addEditUserForm.valid) {
      console.log(this.addEditUserForm.value);
      var data = this.addEditUserForm.value;
      var self = this;
      this.userService.updateUser(this.editUserId,data).then(function(res) {
        console.log(res);
        // if(res.Response == "Success") {
          self.router.navigate(['/users']);
        // } else {
        // }
      });
    }
  }
}
