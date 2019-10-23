package pl.igorkol.dtos;

import java.time.LocalDateTime;

public class ActivityDto {

    private Long id;
    private ProjectDto project;
    private UserDto worker;
    private LocalDateTime start;
    private int duration;
    private String description;

    public ActivityDto(Long id, ProjectDto project, UserDto worker, LocalDateTime start, int duration, String description) {
        this.id = id;
        this.project = project;
        this.worker = worker;
        this.start = start;
        this.duration = duration;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public ProjectDto getProject() {
        return project;
    }

    public UserDto getWorker() {
        return worker;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public int getDuration() {
        return duration;
    }

    public String getDescription() {
        return description;
    }
}
