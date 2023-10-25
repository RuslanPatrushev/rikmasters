import {Injectable} from '@angular/core';
import {BehaviorSubject, debounceTime, filter, fromEvent, Subject, takeUntil} from "rxjs";
import {WIDTH_EXTRA_SMALL, WIDTH_LARGE, WIDTH_MEDIUM, WIDTH_SMALL} from "../constants/window-size.const";
import {WindowSizeEnum} from "../enums/window-size.enum";

@Injectable({
    providedIn: 'root'
})
export class WindowSizeService {
    currentTheme$ = new BehaviorSubject<WindowSizeEnum>(WindowSizeService._getWidthSize(window.innerWidth));
    private _destroyed$ = new Subject<void>();

    constructor() {
        fromEvent(window, 'resize')
            .pipe(
                filter(() =>
                    this.currentTheme$.value != WindowSizeService._getWidthSize(window.innerWidth)),
                debounceTime(100),
                takeUntil(this._destroyed$)
            )
            .subscribe(() => this.currentTheme$.next(WindowSizeService._getWidthSize(window.innerWidth)))
    }

    private static _getWidthSize(windowWidth: number): WindowSizeEnum {

        if (windowWidth < WIDTH_EXTRA_SMALL) {
            return WindowSizeEnum.ExtraSmall;
        }
        if (windowWidth < WIDTH_SMALL) {
            return WindowSizeEnum.Small;
        }

        if (windowWidth < WIDTH_MEDIUM) {
            return (WindowSizeEnum.Medium);
        }

        if (windowWidth < WIDTH_LARGE) {
            return (WindowSizeEnum.Large);
        }

        return (WindowSizeEnum.ExtraLarge);
    }

    destroy(): void {
        this._destroyed$.next();
    }

}
