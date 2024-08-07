import {Component, OnDestroy, OnInit} from '@angular/core';
import {Model} from "../../../objectsList";
import {BehaviorSubject, filter, Subject, takeUntil} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit, OnDestroy{

 destroy$ = new Subject<boolean>();
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
         this.form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(res => {
             console.log(res)
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
