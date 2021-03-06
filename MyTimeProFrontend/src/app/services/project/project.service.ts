import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../../app.constans';
import {Project} from '../../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectList = [];
  projectListLoading = false;
  projectListError;

  constructor(
    private http: HttpClient
  ) {
    this.getProjects();
  }


  public refresh() {
    this.getProjects();
  }

  public getProjects() {
    this.projectListLoading = true;
    this.http.get(API_URL + 'project/all').subscribe(
      response => {
        this.projectListLoading = false;
        this.projectList = <Project[]>response;
      },
      error => {
        this.projectListLoading = false;
        this.projectListError = error;
        console.warn(error);
      }
    );
  }

  public getActiveProjects() {
    // let activeProjects: Project[] = [];
    // this.http.get(API_URL + 'project/all/active').subscribe(
    //   response => {
    //     debugger;
    //     activeProjects = <Project[]>response;
    //   },
    //   error => {
    //     console.warn(error);
    //   }
    // );
    // debugger;
    // return activeProjects;
    return this.http.get(API_URL + 'project/all/active');
  }

  saveProject(project: Project) {
    this.http.post(API_URL + 'project/save', project).subscribe(
      response => {
        this.refresh();
      },
      error => {
        console.warn(error);
      }
    );
  }
}
