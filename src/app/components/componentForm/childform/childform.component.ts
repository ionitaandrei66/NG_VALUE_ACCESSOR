import {Component, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Model} from "../../../objectsList";
import {BehaviorSubject, takeUntil} from "rxjs";

@Component({
  selector: 'app-childform',
  templateUrl: './childform.component.html',
  styleUrls: ['./childform.component.scss'],
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting: ChildformComponent,
    multi: true,
  }]
})
export class ChildformComponent implements OnInit, OnDestroy,ControlValueAccessor{


  destroy$ = new BehaviorSubject<boolean>(false);
  object: Model | any = {};
  onChange!: (obj: Model)=>void;// notify the parent to change its status
  onTouched!: ()=>void;// notify the parent than it was touched
  form: FormGroup = this.fb.group({
    name: [''],
    prop2: [''],
    prop3: [''],
});
  constructor(private  fb: FormBuilder) {
  }
    ngOnInit(): void {

    }
  registerOnChange(fn: any): void {
      this.onChange= fn;
  }

  registerOnTouched(fn: any): void {
      this.onTouched=fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: Model): void {
      this.object = obj;
      if(obj){
        this.form.controls['name'].setValue(obj.name);
        this.form.controls['prop2'].setValue(obj.prop2);
        this.form.controls['prop3'].setValue(obj.prop3);
      }
  }
  ngOnDestroy() {
    this.destroy$.next(true)
  }
  setNewValue(){
    this.object.name = this.form.controls['name'].value;
    this.object.prop2 = this.form.controls['prop2'].value;
    this.object.prop3 = this.form.controls['prop3'].value;
    this.registerOnChange(this.object);
    this.onTouched();
  }
}
