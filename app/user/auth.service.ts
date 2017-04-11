import {Injectable} from '@angular/core'
import {Http,Response,Headers,RequestOptions} from '@angular/http'
import {Observable} from 'rxjs/Rx'

import {IUser} from './user.model'

@Injectable()
export class AuthService{

    currentUser:IUser

    
    constructor(private http:Http) {
        
        
    }

    loginUser(username:string,password:string){
            // this.currentUser={
            //     id:1,
            //     userName:username,
            //     firstName:'Mani',
            //     lastName:'K'
            // }
        let headers= new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});

        let loginInfo={username:username,password:password};

        return this.http.post('/api/login',JSON.stringify(loginInfo),options)
                    .do(resp=>{
                        if(resp)
                        {
                            this.currentUser=<IUser>resp.json().user;
                        }
                    }).catch(error=>{
                        return Observable.of(false);
                    })


    }

    isAuthenticated(){
        return !!this.currentUser;
    }

    updateCurrentUser(firstName:string,lastName:string){
        this.currentUser.firstName=firstName;
        this.currentUser.lastName=lastName;

         let headers= new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});

        return this.http.put(`/api/users/${this.currentUser.id}`,JSON.stringify(this.currentUser),options);        
    }

    checkAuthenticationStatus(){
        this.http.get("/api/currentIdentity").map((resp:any)=>{
            if(resp._body){
                return resp.json();
            } else{
                return {}
            }
        
        }).do(currentUser=>{
            if(!!currentUser.userName){
                this.currentUser=currentUser;
            }
        }).subscribe();
    }

    logout(){
            this.currentUser=undefined;

         let headers= new Headers({'Content-Type':'application/json'});
        let options=new RequestOptions({headers:headers});
        
        return this.http.post('/api/logout',JSON.stringify({}),options);
    }

}