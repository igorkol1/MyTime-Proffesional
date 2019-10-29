package pl.igorkol.dtos;

public class ProjectDto {

    private Long id;
    private String name;
    private Boolean isActive;

    public ProjectDto(Long id, String name, Boolean isActive) {
        this.id = id;
        this.name = name;
        this.isActive = isActive;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Boolean getActive() {
        return isActive;
    }
}
