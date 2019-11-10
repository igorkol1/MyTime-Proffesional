import {Project} from './project.model';
import {User} from './user.model';

export class Activity {

  constructor(
    public id?: number,
    public project?: Project,
    public user?: User,
    public worker?: User,
    public start?: Date,
    public duration?: number,
    public description?: string
  ) {
  }

}
