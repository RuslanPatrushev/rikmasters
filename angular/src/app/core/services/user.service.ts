import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {User, UserData} from "../models/user.model";
import {LOCAL_STORAGE} from "../constants/local-storage..consts";
import {StatusEnum} from "../enums/status.enum";
import {HttpData} from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    httpDataToUsers(httpData$: Observable<HttpData>): Observable<User[]> {
        return httpData$.pipe(
            map((httpData: HttpData) => {
                return httpData.users.map((user: User): User => {
                    return {...user, ...httpData.data.find((data: UserData): boolean => data.user_id == user.id)}
                })
            }))
    }

    addUserStatus(users$: Observable<User[]>): Observable<User[]> {
        return users$.pipe(
            map((users: User[]): User[] => {
                if (localStorage.getItem(LOCAL_STORAGE)) {
                    let statusList: Map<number, StatusEnum> = new Map(JSON.parse(localStorage.getItem(LOCAL_STORAGE)!));
                    return users.map((user: User): User => {
                        if (statusList.get(user.id)) {
                            user.status = statusList.get(user.id)
                        }
                        return user;
                    })
                }
                return users
            })
        )
    }
}
