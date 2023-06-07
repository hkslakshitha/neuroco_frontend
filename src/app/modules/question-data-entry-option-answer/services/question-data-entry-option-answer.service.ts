import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {QuestionDataEntryOptionAnswer} from "../models/question-data-entry-option-answer";
import {API_BASE_URL} from "../../../core/constants/constants";

@Injectable({
  providedIn: 'root'
})
export class QuestionDataEntryOptionAnswerService {
  private apiUrl = API_BASE_URL + '/question_data_entry_option_answer';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  create(questionDataEntryOptionAnswer:QuestionDataEntryOptionAnswer): Observable<any> {
    return this.http.post(this.apiUrl, JSON.stringify(questionDataEntryOptionAnswer),this.httpOptions);
  }

  find(id:string): Observable<any> {
    return this.http.get(this.apiUrl + '/' + id);
  }

  update(questionDataEntryOptionAnswer:QuestionDataEntryOptionAnswer): Observable<any> {
    return this.http.put(this.apiUrl, JSON.stringify(questionDataEntryOptionAnswer),this.httpOptions);
  }

  delete(id:string): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
