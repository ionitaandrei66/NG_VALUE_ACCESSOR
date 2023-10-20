import {BehaviorSubject} from "rxjs";

export const objectsListSubject: BehaviorSubject<Model[]> = new BehaviorSubject( [
  { id: 1, name: 'Obiectul 1', prop2: 'Valoare2', prop3: 'Valoare3' },
  { id: 2, name: 'Obiectul 2', prop2: 'Valoare2', prop3: 'Valoare3'},
  { id: 3, name: 'Obiectul 3', prop2: 'Valoare2', prop3: 'Valoare3'}
])
export interface Model{
  id: number;
  name: string;
  prop2: string;
  prop3:string;
}
