import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User, UserData} from "../models/user.model";
import {StatusEnum} from "../enums/status.enum";
import {LOCAL_STORAGE} from "../constants/local-storage..consts";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly API_PATH = environment.apiUrl;

    constructor(private http: HttpClient) {
    }

    getHttpData(): Observable<HttpData> {
        return this.http
            .get<HttpData>(this.API_PATH + "/api/rubetek/angular-testcase-list/")
    }
}

//todo
export interface HttpData {
    page: {
        total: number,
        current: number,
        size: number
    },
    users: User[],
    data: UserData[]
}


