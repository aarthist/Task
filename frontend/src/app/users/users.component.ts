import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public data:Array<any>;
  constructor(public userServices: UsersService, public router:Router) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userServices.getUsers().then(res => {
      this.data = res;
    })
  }
  deleteUser(id) {
    var self = this;
    this.userServices.deleteUser(id).then(function(res) {
        console.log("deleted");
        self.getUsers()
    })
  }

  editUser(id) {
    console.log(id)
    this.router.navigate(['/edit-user/'+id]);

  }
}
