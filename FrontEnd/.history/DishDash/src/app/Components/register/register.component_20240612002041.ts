import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { customer } from '../../Model/customer';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  uniqueId:string = ''
    constructor(private fb:FormBuilder, private userService:UserService){}


    registerForm=this.fb.group({
      customerId:['',[Validators.required]],
      customerName:['',[Validators.required,Validators.minLength(3),Validators.pattern(/^[a-zA-Z ]+$/)]],
      customerEmail:['',[Validators.required,Validators.pattern(/^\S+@\S+\.\S+$/)]],
      customerPassword:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword:['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      customerProfilePic:[''],
      customerPhone:['',[Validators.required,Validators.pattern(/^[6789]\d{9}$/)]]
      // customerAddress:this.fb.group({
      //   address1: [''],
      //   landMark: [''],
      //   city: [''],
      //   pinCode: [''],
      //   currentLocation: ['']
      // })
    },{validators:this.checkPassowrdMisMatch})

    get customerId()
    {
      return this.registerForm.get('customerId');
    }
    get customerName(){
      return this.registerForm.get('customerName');
    }

    get customerEmail()
    {
      return this.registerForm.get('custonerEmail');
    }

    get customerPassword()
    {
      return this.registerForm.get('customerPassword');
    }

    get confirmPassword()
    {
      return this.registerForm.get('confirmPassword');
    }

    get customerProfilePic()
    {
      return this.registerForm.get('customerProfilePic');
    }

    get customerPhone()
    {
      return this.registerForm.get('customerPhone');
    }

    get address1()
    {
      return this.registerForm.get('customerAddress.address1');
    }
    get landmark()
    {
      return this.registerForm.get('customerAddress.landmark');
    }
    get city()
    {
      return this.registerForm.get('customerAddress.city');
    }
    get pinCode()
    {
      return this.registerForm.get('customerAddress.pinCode');
    }
    get currentLocation()
    {
      return this.registerForm.get('customerAddress.currentLocation');
    }

    generateUniqueKey() {
      const timestamp = new Date().getTime;

      const randomNumber = Math.floor(Math.random()*1000);

      return `cus-${timestamp}-${randomNumber}`
    }
    
    onSubmit ()
    {
      let registerCustomer:any=this.registerForm.value as any;
      console.log(registerCustomer);
      this.userService.registerUser(registerCustomer).subscribe({
        next:data=>{
            console.log(data);
        },
        error:err=>{
            console.log("Error",err);
            
        }
      })
      
    }
    checkPassowrdMisMatch(c:AbstractControl)
    {
      const password=c.get('customerPassword');
      console.log(password);
      
      const confirmPass=c.get('confirmPassword');
      console.log(confirmPass);
      if (!password?.value || !confirmPass?.value) {
        return null;
      }
      console.log(password.value === confirmPass.value ? null : { passwordMismatch: true });
      
  
      return password.value === confirmPass.value ? null : { passwordMismatch: true };
    }
}