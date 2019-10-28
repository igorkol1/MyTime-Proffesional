package pl.igorkol.dtos;

public class UserDto {

    private Long id;
    private String email;
    private Boolean isManager;
    private Boolean isActive;

    public UserDto(Long id,String email, Boolean isManager, Boolean isActive) {
        this.id = id;
        this.email = email;
        this.isManager = isManager;
        this.isActive = isActive;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public Boolean getManager() {
        return isManager;
    }

    public Boolean getActive() {
        return isActive;
    }
}
