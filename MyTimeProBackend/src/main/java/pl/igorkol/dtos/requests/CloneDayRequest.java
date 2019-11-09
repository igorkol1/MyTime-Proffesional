package pl.igorkol.dtos.requests;

import java.time.LocalDate;

public class CloneDayRequest {

    private LocalDate activityDate;
    private LocalDate startDate;
    private LocalDate endDate;

    public CloneDayRequest() {
    }

    public CloneDayRequest(LocalDate activityDate, LocalDate startDate, LocalDate endDate) {
        this.activityDate = activityDate;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public LocalDate getActivityDate() {
        return activityDate;
    }

    public void setActivityDate(LocalDate activityDate) {
        this.activityDate = activityDate;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
