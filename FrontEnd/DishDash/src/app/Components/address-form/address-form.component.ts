import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})
export class AddressFormComponent {
  constructor(private fb: FormBuilder, private router: Router) {}

  addressForm = this.fb.group({
    address1: ['', Validators.required],
    landmark: ['', Validators.required],
    city: ['', Validators.required],
    pinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    currentLocation: ['', Validators.required]
  });

  get address1() {
    return this.addressForm.get('address1');
  }

  get landmark() {
    return this.addressForm.get('landmark');
  }

  get city() {
    return this.addressForm.get('city');
  }

  get pinCode() {
    return this.addressForm.get('pinCode');
  }

  get currentLocation() {
    return this.addressForm.get('currentLocation');
  }

  onSubmit() {
    if (this.addressForm.invalid) {
      return;
    }

    
    const address = this.addressForm.value;
    console.log('Address:', address);

    
    this.router.navigate(['/customer/profile']);
  }

}
