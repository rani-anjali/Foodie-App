import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loadingbar',
  templateUrl: './loadingbar.component.html',
  styleUrls: ['./loadingbar.component.css']
})
export class LoadingbarComponent implements OnInit {

  progress: number = 0;
  isLoading: boolean = false;

  constructor(private loadingService: LoadingService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Subscribe to the loading progress
    this.loadingService.loadingSubject_1.subscribe({
      next: data => {
        this.progress = data;
      }
    });

    // Subscribe to the loading state
    this.loadingService.isLoading.subscribe({
      next: data => {
        this.isLoading = data;
        this.cdr.detectChanges();
      }
    });
  }
}
