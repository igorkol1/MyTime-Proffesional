import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../services/project/project.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewUserFormComponent} from '../new-user-form/new-user-form.component';
import {ProjectFormComponent} from '../project-form/project-form.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    this.projectService.refresh();
  }

  handleRefresh() {
    this.projectService.refresh();
  }

  handleAddProject() {
    const modalRef = this.modalService.open(ProjectFormComponent);
    modalRef.componentInstance.newProject = true;
  }

  handleEditProject(project: any) {
    const modalRef = this.modalService.open(ProjectFormComponent);
    modalRef.componentInstance.project = project;
  }
}
