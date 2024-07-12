import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrl: './order-success.component.css'
})
export class OrderSuccessComponent implements OnInit {
  orderId:string = '';
  

  constructor(private ac:ActivatedRoute){

  }
  ngOnInit(): void {
    this.ac.paramMap.subscribe({
      next:data => {
        this.orderId = data.get("orderId")
      },
      error:e => {
        console.log("Failure in fetching order Id")
      }
    })

  }

  

}
