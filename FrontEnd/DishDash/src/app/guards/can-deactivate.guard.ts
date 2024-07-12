import { CanDeactivateFn } from '@angular/router';
import { CheckoutComponent } from '../Components/checkout/checkout.component';

export const canDeactivateGuard: CanDeactivateFn<CheckoutComponent> = (component, currentRoute, currentState, nextState) => {


  return component.canDeactivate()
};
