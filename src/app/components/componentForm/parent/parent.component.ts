import {Component, OnDestroy, OnInit} from '@angular/core';
import {Model, objectsListSubject} from "../../../objectsList";
import {BehaviorSubject, catchError, filter, of, takeUntil} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit, OnDestroy{

 destroy$ = new BehaviorSubject<boolean>(false);
 form: FormGroup = this.fb.group({});
 listData: Model[]=  [
   { id: 1, name: 'Obiectul 1', prop2: 'Valoare2', prop3: 'Valoare3' },
   { id: 2, name: 'Obiectul 2', prop2: 'Valoare2', prop3: 'Valoare3'},
   { id: 3, name: 'Obiectul 3', prop2: 'Valoare2', prop3: 'Valoare3'}
 ];
 constructor(private  fb: FormBuilder) {
 }
  ngOnInit() {
          this.listData.forEach((rec)=>{
            this.form.addControl(String(rec.id),new FormControl(rec, Validators.required))
          })

  }

  ngOnDestroy() {
   this.destroy$.next(true)
  }

  protected readonly filter = filter;
  protected readonly console = console;

  see() {
    console.log(this.form.controls)
  }
}
