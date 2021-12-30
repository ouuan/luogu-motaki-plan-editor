export interface Task {
  x: number;
  y: number;
  data: string;
}

export interface Plan {
  [name: string]: Task;
}
