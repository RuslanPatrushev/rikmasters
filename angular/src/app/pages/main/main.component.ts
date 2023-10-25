import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {DateAdapter} from "@angular/material/core";
import {WindowSizeService} from "../../core/services/window-size.service";
import {WindowSizeEnum} from "../../core/enums/window-size.enum";
import {SidenavService} from "../../core/services/sidenav.service";

@Component({
    selector: 'rik-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

    windowSizeEnum = WindowSizeEnum;

    @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

    constructor(
                private dateAdapter: DateAdapter<Date>,
                public windowSizeService: WindowSizeService,
                public sidenavService: SidenavService) {
        this.dateAdapter.setLocale("ru");
    }

    ngOnInit() {
        this.windowSizeService.currentTheme$.subscribe((): void => {
            this.sidenavService.toggle(
                this.windowSizeService.currentTheme$.value === this.windowSizeEnum.ExtraLarge)
        })
    }


}
