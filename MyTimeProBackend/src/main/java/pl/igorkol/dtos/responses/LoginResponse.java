package pl.igorkol.dtos.responses;

public class LoginResponse {

    private String email;
    private boolean isAuthorize;
    private boolean isManager;

    public LoginResponse(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isAuthorize() {
        return isAuthorize;
    }

    public void setAuthorize(boolean authorize) {
        isAuthorize = authorize;
    }

    public boolean isManager() {
        return isManager;
    }

    public void setManager(boolean manager) {
        isManager = manager;
    }
}
