import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeInfo } from '../models/employee-info';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssociateDataService {

  token: string = sessionStorage.getItem("token") || '';
  emp: User = JSON.parse(sessionStorage.getItem("user")||'');
  empID: number = this.emp.id;
  associateId : number = JSON.parse(sessionStorage.getItem("user") || "").id;

  associatesUrl: string = `http://localhost:8082/employees/${this.associateId}?field=quiz-scores,topic-competencies,qc-feedbacks`;

  httpOptions = {
    headers: new HttpHeaders({"Authorization": this.token})
  };

  constructor(private http: HttpClient) {  
    
  }
  getEmployeeInfo():Observable<any>{
      return this.http.get<any>(this.associatesUrl, this.httpOptions);
    }

  setEmployeeQuiz(employeeQuiz: string, quizId: number) {
    console.log(employeeQuiz);
    console.log(quizId);
    let user = JSON.parse(sessionStorage.getItem("user") || "");
    console.log(user);
    this.http.put(`http://localhost:8082/employees/${user.id}/quizzes/${quizId}`, employeeQuiz, { headers : new HttpHeaders({"Authorization":this.token,"Content-Type":"application/json"})}).subscribe(
       (response) => console.log(response),
       (error) => console.log(error),
       () => console.log()

      );
  }




}
