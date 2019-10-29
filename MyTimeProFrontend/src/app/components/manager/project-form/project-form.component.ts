import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Project} from '../../../models/project.model';
import {ProjectService} from '../../../services/project/project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  @Input()
  newProject: boolean = false;

  @Input()
  project: Project = new Project();

  constructor(
    private projectService: ProjectService,
    public activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit() {
  }

  handleSave() {
    this.projectService.saveProject(this.project);
    this.activeModal.close();
  }

  handleCancel() {
    this.activeModal.close();
  }
}
