import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User, UserData} from "../models/user.model";
import {DEFAULT_URL, URL_REF} from "../constants/url.const";
import {TestcaseList} from "../models/testcase-list.model";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private api_url;

    constructor(private http: HttpClient) {
        this.api_url = this.ENV_API_URL === URL_REF ? DEFAULT_URL : this.ENV_API_URL
    }

    getHttpData(): Observable<TestcaseList> {
        return this.http
            .get<TestcaseList>(this.api_url + "/api/rubetek/angular-testcase-list/")
    }

    private readonly ENV_API_URL = environment.apiUrl;
}



