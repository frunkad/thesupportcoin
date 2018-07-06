export interface Task {
  $key?: string;
  completed: boolean;    //L B
  title: string;         //L B
  name: string;          //L B
  location: string;      //L B
  organisation?: string; //L
  amount: number;        //L B
  photo?: string;        //L B
  immediate?: boolean;   //  B
  description?: string;  //L B  
  idproof?: string;      //  B
}
