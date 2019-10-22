package pl.igorkol.dtos;

public class ProjectDto {

    private String name;
    private Boolean isActive;

    public ProjectDto(String name, Boolean isActive) {
        this.name = name;
        this.isActive = isActive;
    }

    public String getName() {
        return name;
    }

    public Boolean getActive() {
        return isActive;
    }
}
