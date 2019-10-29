package pl.igorkol.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.igorkol.dtos.ProjectDto;
import pl.igorkol.entities.Project;
import pl.igorkol.repositories.ProjectRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<ProjectDto> getAllProjects() {
        return projectRepository.findAll()
                .stream()
                .map(ProjectService::mapToProjectDto)
                .collect(Collectors.toList());
    }

    public ProjectDto getProject(String projectName) {
        Project project = projectRepository.findByName(projectName).orElse(null);
        if (project != null) {
            return mapToProjectDto(project);
        } else {
            return null;
        }
    }

    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    public static ProjectDto mapToProjectDto(Project project) {
        return new ProjectDto(project.getId(), project.getName(), project.getActive());
    }


    public boolean deactivateProject(String projectName) {
        Optional<Project> projectOptional = projectRepository.findByName(projectName);
        if (projectOptional.isPresent()) {
            Project project = projectOptional.get();
            project.setActive(false);
            saveProject(project);
            return true;
        }
        return false;
    }
}
