import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Question} from "../models/question";
import {API_BASE_URL} from "../../../core/constants/constants";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = API_BASE_URL + '/question';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  create(question:Question): Observable<any> {
    return this.http.post(this.apiUrl, JSON.stringify(question),this.httpOptions);
  }

  findAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  find(id:string): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id);
  }
}
