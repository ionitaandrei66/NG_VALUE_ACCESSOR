import {Directive, Inject, Injector, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl, FormControlDirective, FormControlName, FormGroupDirective,
  NG_VALIDATORS, NgControl,
  ValidationErrors,
  Validator
} from "@angular/forms";
import {Model} from "../objectsList";

@Directive({
  selector: '[appAccessor]'
})
export class AccessorDirective<T> implements ControlValueAccessor, OnInit{
  control: FormControl | undefined
  onChange!: (obj: Model) => void;
  onTouched!: () => void;

  constructor(@Inject(Injector) private  injector: Injector) { }

  ngOnInit(): void {
    this.setForm()
  }
  //injectorul din Angular este folosit pentru a obține instanțe ale serviciilor sau directivelor disponibile în injectorul de dependențe al aplicației. În cazul tău, injectorul este folosit în AccessorDirective pentru a accesa instanța NgControl asociată cu componenta sau directiva care extinde AccessorDirective. Acest lucru permite directivei să interacționeze cu controlul de formular Angular (FormControl, FormGroup) asociat cu elementul de formular pe care este aplicată directiva.
  //
  // Scopul Injectorului
  // Scopul utilizării injectorului în acest context este de a face AccessorDirective flexibilă și reutilizabilă, permițindu-i să funcționeze cu diferite tipuri de controale de formular (de exemplu, FormControl, FormGroup) fără a necesita referințe statice sau hard-coded la aceste controale. Prin obținerea controlului de formular din injector, directiva poate să se adapteze în funcție de contextul în care este utilizată.
  //
  // Utilizarea Try-Catch
  // Blocul try-catch este folosit pentru a gestiona cazurile în care tentativa de a accesa NgControl sau controlul de formular asociat eșuează. Acest lucru poate apărea din mai multe motive, cum ar fi:
  //
  // Directiva este utilizată într-un context unde nu există un NgControl asociat (de exemplu, nu este plasată într-un formular sau pe un element de control al formularului).
  // Aplicația rulează într-un mediu unde dependențele necesare nu sunt disponibile sau nu sunt încă inițializate la momentul când setForm este apelat.
  // Utilizarea try-catch permite directivei să gestioneze aceste situații într-un mod controlat, inițializând this.control cu un nou FormControl dacă nu se poate obține un control de formular valid prin injector. Acest lucru asigură că directiva nu va cauza erori la runtime din cauza lipsei controlului de formular și permite funcționarea corectă a logicii de ControlValueAccessor.
  //
  // Scopul Final
  // Scopul final al acestei implementări este de a crea o directivă (AccessorDirective) care poate servi ca un ControlValueAccessor personalizat, permițându-i să fie conectată la orice control de formular Angular existent sau nou creat. Acest lucru facilitează crearea de componente de formular personalizate care pot fi integrate în mod transparent cu infrastructura de formulare Angular, beneficiind de validare, actualizarea stării și alte caracteristici ale formularului Angular, fără a necesita cod boilerplate repetitiv pentru fiecare componentă personalizată.
  setForm(){
    try{
      const  formControl = this.injector.get(NgControl);
      switch (formControl.constructor){
        case FormControlName:
          this.control = this.injector.get(FormGroupDirective).getControl(formControl as FormControlName);
          break
        default:
          this.control = (formControl as FormControlDirective).form as FormControl;
      }
    }catch (err){
      this.control = new FormControl();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: Model): void {
    console.log(obj)
    if(this.control){
      this.control.setValue(obj)
    }else{
      this.control = new FormControl();
    }

    // this.object = obj;
    // if (obj) {
    //   this.form.controls['name'].setValue(obj.name);
    //   this.form.controls['prop2'].setValue(obj.prop2);
    //   this.form.controls['prop3'].setValue(obj.prop3);
    // }
  }

}

@Directive({
  selector: '[firstTestValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: FirstTestValidatorDirective, multi: true}]
})
export class FirstTestValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
      return { 'custom': true };
  }
}