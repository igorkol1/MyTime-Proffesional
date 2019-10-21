package pl.igorkol.dtos;

public class UserDto {

    private String email;
    private Boolean isManager;
    private Boolean isActive;

    public UserDto(String email, Boolean isManager, Boolean isActive) {
        this.email = email;
        this.isManager = isManager;
        this.isActive = isActive;
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
