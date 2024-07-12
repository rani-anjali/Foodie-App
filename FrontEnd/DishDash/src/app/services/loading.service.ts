import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loadingSubject_1 = new Subject<number>();

  public isLoading = new Subject<boolean>();

  public spinnerVisible = new Subject<boolean>();

  public spinnerVisible2 = new Subject<boolean>();




  setLoading(value:number) {
    this.loadingSubject_1.next(value);
  }

  setIsLoading(isloading:boolean) {
    this.isLoading.next(isloading);
  }

  setSpinnerVisible(visible:boolean) {
    this.spinnerVisible.next(visible)
  }

  setSpinnerVisible2(visible:boolean) {
    this.spinnerVisible.next(visible)
  }

  getSpinnerVisible() {
    return this.spinnerVisible.asObservable();
  }

  getSpinnerVisible2() {
    return this.spinnerVisible.asObservable();
  }
}
