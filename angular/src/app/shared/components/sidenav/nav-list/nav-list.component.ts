import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NavList} from "./models";
import {NAV_LIST} from "../../../../core/constants/nav-list.const";

@Component({
    selector: 'rik-nav-list',
    templateUrl: './nav-list.component.html',
    styleUrls: ['./nav-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavListComponent {
    protected readonly navList: NavList = NAV_LIST;
}
