import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {SideNav} from "./models";
import {WindowSizeService} from "../../../core/services/window-size.service";
import {WindowSizeEnum} from "../../../core/enums/window-size.enum";
import {SIDE_NAV} from "../../../core/constants/side-nav.const";
import packageJson from '../../../../../package.json';

@Component({
    selector: 'rik-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent {
    @Input() isSizeChanged: boolean = false;
    @Input() fixedTopGap: number = 56;

    windowSizeEnum = WindowSizeEnum;

    constructor(public windowSizeService: WindowSizeService) {
    }

    protected readonly sideNav: SideNav = SIDE_NAV
    protected readonly version: string = packageJson.version;
}
