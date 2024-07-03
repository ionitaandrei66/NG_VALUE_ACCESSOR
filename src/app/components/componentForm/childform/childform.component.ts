import {Component, forwardRef, Inject, Injector, OnDestroy, OnInit} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    NG_VALUE_ACCESSOR
} from "@angular/forms";
import {Model} from "../../../objectsList";
import {BehaviorSubject} from "rxjs";
import {AccessorDirective} from "../../../directive/accessor.directive";

@Component({
    selector: 'app-childform',
    templateUrl: './childform.component.html',
    styleUrls: ['./childform.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(()=>ChildformComponent),
        multi: true,
    },
    ]
})
export class ChildformComponent<T> extends AccessorDirective<T> implements OnInit, OnDestroy{


    destroy$ = new BehaviorSubject<boolean>(false);
    object: Model | any = {};
    form: FormGroup = this.fb.group({
        name: [''],
        prop2: [''],
        prop3: [''],
    });

    constructor(@Inject(Injector) injector: Injector,private fb: FormBuilder) {
        super(injector);
    }

    ngOnDestroy() {
        this.destroy$.next(true)
    }

    setNewValue() {
        this.object.name = this.form.controls['name'].value;
        this.object.prop2 = this.form.controls['prop2'].value;
        this.object.prop3 = this.form.controls['prop3'].value;
        this.registerOnChange(this.object);
        this.onTouched();
    }
}
