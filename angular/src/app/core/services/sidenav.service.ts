import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SidenavService {
    currentStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    toggle(isOpen?: boolean): void {
        this.currentStatus$.next(isOpen === undefined ? !this.currentStatus$.value : isOpen)
    }
}
