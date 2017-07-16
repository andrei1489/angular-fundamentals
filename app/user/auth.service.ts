import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import { Http, Headers, RequestOptions, Response } from '@angular/http'
import { Observable } from 'rxjs/RX'
@Injectable()
export class AuthService{
    currentUser:IUser
    constructor(private http:Http){}
    loginUser(username:string, password:string){
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions({headers: headers})
        let loginInfo = {username: username,password:password}
        return this.http.post('/api/login',JSON.stringify(loginInfo),options).do( response =>{
            if(response){
                this.currentUser=<IUser>response.json().user;
            }
        }).catch(error => {
            return Observable.of(false)
        })
    }
    isAuthenticated():boolean{
        return !!this.currentUser;
    }
    updateUser(firstName:string, lastName:string){
        this.currentUser.firstName=firstName;
        this.currentUser.lastName=lastName;
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions({headers: headers})
        return this.http.put(`/api/users/${this.currentUser.id}`,JSON.stringify(this.currentUser),options)
    }
    checkAuthenticationStatus(){
        this.http.get('/api/currentIdentity').map( (response:any) => {
            if(response._body){
                return response.json()
            }else{
                return {}
            }
        }).do(currentUser => {
            if (!!currentUser){
                this.currentUser=currentUser;
            }
        }).subscribe()
    }
    logout(){
        this.currentUser=undefined
        let headers = new Headers({'Content-Type':'application/json'})
        let options = new RequestOptions({headers: headers})
        return this.http.post(`/api/logout`,JSON.stringify({}),options)
    }
}