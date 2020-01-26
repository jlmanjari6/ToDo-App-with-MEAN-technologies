import { Task } from './../../Task';
import { TasksService } from './../services/tasks.service';
import { Component } from '@angular/core';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
})
export class TasksComponent {
  tasks: Task[];
  title: string;

  constructor(private tasksvc: TasksService) {
    // to retrieve tasks on page load
    this.tasksvc.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  // add task event
  addTask(event) {
    event.preventDefault();
    var newTask = {
      title: this.title,
      isDone: false
    }

    this.tasksvc.addTask(newTask)
      .subscribe(task => {
        console.log(task.insertedId);
        newTask._id = task.insertedId;
        this.tasks.push(newTask);
        this.title = ""
      });
  }

  // delete task event
  deleteTask(id) {
    var tasks = this.tasks;

    this.tasksvc.deleteTask(id).subscribe(data => {
      if (data.n == 1) {
        for (var i = 0; i < tasks.length; i++) {
          if (tasks[i]._id == id) {
            tasks.splice(i, 1);
          }
        }
      }
    });
  }

  // update task event
  updateStatus(task) {
    var _task = {
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    };

    this.tasksvc.updateStatus(_task).subscribe(data => {
      task.isDone = !task.isDone;
    });
  }
}

// to enable CORS policy
// chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security