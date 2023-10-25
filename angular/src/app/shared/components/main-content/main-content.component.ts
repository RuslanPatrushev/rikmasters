import {ChangeDetectionStrategy, Component,} from '@angular/core';
import {MainContent} from "./models";
import {MAIN_CONTENT} from "../../../core/constants/main-content.const";

@Component({
    selector: 'rik-main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainContentComponent {
    protected readonly mainContent: MainContent = MAIN_CONTENT;
}
