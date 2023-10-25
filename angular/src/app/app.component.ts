import {Component, OnDestroy} from '@angular/core';
import {WindowSizeService} from "./core/services/window-size.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy{
  constructor(private windowSizeService: WindowSizeService) {
  }

  ngOnDestroy(): void {
    this.windowSizeService.destroy();
  }
}

