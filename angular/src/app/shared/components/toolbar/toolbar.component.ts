import {Component} from '@angular/core';
import {Toolbar} from "./models";
import {WindowSizeService} from "../../../core/services/window-size.service";
import {WindowSizeEnum} from "../../../core/enums/window-size.enum";
import {SidenavService} from "../../../core/services/sidenav.service";
import {Profile} from "../../../core/models/profile.model";
import {PROFILE} from "../../../core/constants/profile.const";
import {TOOLBAR} from "../../../core/constants/toolbar.const";

@Component({
    selector: 'rik-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
    windowSizeEnum = WindowSizeEnum;
    profile: Profile = PROFILE;

    constructor(public windowSizeService: WindowSizeService,
                public sidenavService: SidenavService) {
    }
    protected readonly toolbar: Toolbar = TOOLBAR;
}
