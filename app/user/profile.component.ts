import { Component, Inject, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import {Toastr, TOASTR_TOKEN} from '../common/toastr.service';
import {AuthService} from './auth.service';

@Component({
  moduleId: module.id,
  templateUrl: 'profile.component.html',
  styles: [`em {float:right; color:#E05C65; padding-left:10px; }
   .error input { background-color:#E3C3C5}`],
})

export class ProfileComponent  implements OnInit {

      profileForm: FormGroup;

      private firstName: FormControl;
      private lastName: FormControl;

       constructor(private authSvc: AuthService,
                   private router: Router,
                   @Inject(TOASTR_TOKEN) private toastr: Toastr) {

       }

       ngOnInit() {
         this.firstName = new FormControl(this.authSvc.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
         this.lastName = new FormControl(this.authSvc.currentUser.lastName, Validators.required);
         this.profileForm = new FormGroup({
           firstName: this.firstName,
           lastName: this.lastName,
         });
       }

       cancel() {
          this.router.navigate(['events']);
       }

       saveProfile(formValues) {
        if (this.profileForm.valid) {
             this.authSvc.updateCurrentUser(formValues.firstName, formValues.lastName).subscribe(() => {
                this.toastr.success('Profile saved sucessfully!');
             });
             // this.router.navigate(['events'])

        }

       }

       logout() {
         this.authSvc.logout().subscribe(() => {
              this.router.navigate(['/user/login']);
         });
       }

        validateFirstName() {
         return this.firstName.valid || this.firstName.untouched;
        }

         validateLastName() {
         return this.lastName.valid || this.lastName.untouched;
        }

       }
