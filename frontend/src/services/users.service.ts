import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public backendUrl = environment.domainUrl;

  constructor(private http: HttpClient) { }

  getUsers() :Promise<any> {
    return this.http.get(this.backendUrl).toPromise()
    .then(function(res) {
      console.log(res)
      return res;
    }, function(error) {
      return error;
    })
  }

  saveUser(data):Promise<any> {
    return this.http.post(this.backendUrl,data).toPromise().then(function(res) {
      return res;
    }, function(message) {
      return message;
    })
  }

  updateUser(id,data):Promise<any> {
    return this.http.put(this.backendUrl+"/"+id,data).toPromise().then(function(res) {
      return res;
    }, function(message) {
      return message;
    })
  }

  viewUserById(id):Promise<any> {
    return this.http.get(this.backendUrl+"/"+id).toPromise().then(function(res) {
      return res;
    }, function(message) {
      return message;
    })
  }

  deleteUser(id):Promise<any> {
    return this.http.delete(this.backendUrl+"/"+id).toPromise().then(function(res) {
      return res;
    }, function(message) {
      return message;
    })
  }
}
