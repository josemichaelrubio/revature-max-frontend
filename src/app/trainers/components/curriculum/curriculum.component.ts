import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventSourceInput } from '@fullcalendar/angular';
import { Curriculum } from 'app/models/curriculum';
import { CurriculumService } from 'app/services/curriculum.service';
import { TopicService } from 'app/services/topic.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent implements OnInit {

  showDayModal: boolean = false;
  showEditButton: boolean = false;
  curriculum: Curriculum[] = [];
  formData!: FormGroup;
  day!:string;
  topicTitle!: string;
  events = [
    { title: 'Start Date', date: '2021-03-01' }
  ];

  @ViewChild("content") private contentRef!: TemplateRef<Object>;

  constructor(private topicService: TopicService, private router: Router, private curriculumService: CurriculumService) {
    curriculumService.getCurriculumDays().subscribe((data)=>{
      this.curriculum=data;
      for(let curDay of this.curriculum){
        if(curDay.topics!=null){
          for(let topic of curDay.topics){
          this.events.push({ title: topic.name, date: curDay.date});
          }
          
        }
        
      }
      this.calendarOptions.events = this.events;
    },
    (err)=>console.log(err),
    ()=>{
      console.log(this.curriculum);
    });
   }

  ngOnInit(): void {
    this.formData = new FormGroup({
      topicName: new FormControl("Topic"),
      eventDay: new FormControl("Day")
    });
  }
  handleDateClick(arg: any) {
    // alert('date click! ' + arg.dateStr)
    this.day = arg.dateStr
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    eventClick: this.handleEventClick.bind(this),
    editable: true,
    selectable: true,
    selectMirror: true,
    weekends: false // initial value
  };

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }

  handleEventClick(arg:any){

  }
  
}
