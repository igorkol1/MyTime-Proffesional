package pl.igorkol.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.time.LocalDateTime;

@Entity(name = "activities")
public class Activity {

    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private Project project;

    @OneToOne
    private User worker;

    private LocalDateTime start;
    private int duration;
    private String description;

    public Activity() {
    }

    public Activity(Project project, User worker, LocalDateTime start, int duration, String description) {
        this.project = project;
        this.worker = worker;
        this.start = start;
        this.duration = duration;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public User getWorker() {
        return worker;
    }

    public void setWorker(User worker) {
        this.worker = worker;
    }

    public LocalDateTime getStart() {
        return start;
    }

    public void setStart(LocalDateTime start) {
        this.start = start;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
