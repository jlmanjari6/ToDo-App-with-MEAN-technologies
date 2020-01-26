import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class TasksService {
    constructor(private http: Http) {
        console.log("Tasks service initialized!");
    }

    // access GET api  
    getTasks() {
        return this.http.get("http://localhost:3000/api/tasks")
            .pipe(map(res => res.json()));
    }

    // access POST api
    addTask(newTask) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("http://localhost:3000/api/task", JSON.stringify(newTask), { headers: headers })
            .pipe(map(res => res.json()));
    }

    // access DELETE api
    deleteTask(id) {
        return this.http.delete("http://localhost:3000/api/tasks/" + id)
            .pipe(map(res => res.json()));
    }

    // access PUT api
    updateStatus(task) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put("http://localhost:3000/api/tasks/" + task._id, JSON.stringify(task), { headers: headers })
            .pipe(map(res => res.json()));
    }

}