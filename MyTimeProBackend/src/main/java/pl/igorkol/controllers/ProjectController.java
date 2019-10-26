package pl.igorkol.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.igorkol.dtos.ProjectDto;
import pl.igorkol.entities.Project;
import pl.igorkol.services.ProjectService;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/project")
public class ProjectController {

    private ProjectService projectService;

    @Autowired
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping("/all")
    public List<ProjectDto> getAll() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{projectName}")
    public ResponseEntity<ProjectDto> getProject(@PathVariable String projectName) {
        ProjectDto projectDto = projectService.getProject(projectName.replace('_', ' '));
        if (projectDto != null) {
            return new ResponseEntity<ProjectDto>(projectDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<ProjectDto>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<Void> createProject(@RequestBody Project project) {
        projectService.saveProject(project);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(project.getId())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    @PostMapping("/deactivate/{projectName}")
    public ResponseEntity<Void> deactivateProject(@PathVariable String projectName) {
        boolean status = projectService.deactivateProject(projectName.replace('_', ' '));
        return status ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }
}
