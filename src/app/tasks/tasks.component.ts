import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  newTask!: FormGroup;
  taskList: any[] = [];
  completed: boolean = false;
  ddList: any[] = [
    { id: 0, value: 'select' },
    { id: 1, value: 'completed' },
  ];
  selectedDDValue: any;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getTasksDetails();
    this.newTask = this.fb.group({
      todoItem: ''
    })
  }

  getTasksDetails() {
    this.taskList = localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task') || '[]') : []
  }
  markDone(value: any) {
    value.completed = !value.completed
    const taskDetails = localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task') || '[]') : []
    const selected = taskDetails.find((sel: any) => sel.id == value.id)
    selected.completed = true;
    localStorage.setItem('task', JSON.stringify(taskDetails))

  }
  removeTask(i: number) {
    this.taskList.splice(i, 1)
    localStorage.setItem('task', JSON.stringify(this.taskList))

  }
  changeSelection(value: any) {
    if (value.id == 0) {
      this.getTasksDetails();
      return;
    }
    const lsValue = localStorage.getItem('task') ? JSON.parse(localStorage.getItem('task') || '{}') : []
    const filterdData = lsValue.filter((_filter: any) => _filter.completed == true)
    this.taskList = filterdData;
  }

  onSubmit() {
    const value = this.newTask.value.todoItem
    this.taskList.push({ id: this.taskList.length, name: value, completed: false })
    localStorage.setItem('task', JSON.stringify(this.taskList))
    this.newTask.reset();
  }
}
