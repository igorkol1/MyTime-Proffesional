package pl.igorkol.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import pl.igorkol.dtos.ActivityDto;
import pl.igorkol.entities.Activity;
import pl.igorkol.services.ActivityService;

import java.net.URI;
import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/activity")
public class ActivityController {

    private ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping("/all")
    public List<ActivityDto> getAllActivities() {
        return activityService.getAllActivities();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActivityDto> getActivity(@PathVariable long id) {
        ActivityDto activityDto = activityService.getActivity(id);
        if (activityDto != null) {
            return new ResponseEntity<ActivityDto>(activityDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<ActivityDto>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/user/{year}/{month}/{day}")
    public List<ActivityDto> getUserActivityPerDay(Principal principal,
                                                   @PathVariable int year,
                                                   @PathVariable int month,
                                                   @PathVariable int day) {

        LocalDate date = LocalDate.of(year, month, day);
        return activityService.getAllActivitiesPerDayForUser(principal.getName(),
                date);
    }

    @GetMapping("/{userEmail}/{year}/{month}/{day}")
    public List<ActivityDto> getSelectedUserActivityPerDay(
            @PathVariable String userEmail,
            @PathVariable int year,
            @PathVariable int month,
            @PathVariable int day) {
        LocalDate date = LocalDate.of(year, month, day);
        return activityService.getAllActivitiesPerDayForUser(userEmail,
                date);
    }

    @GetMapping("/project/{projectId}/{year}/{month}/{day}")
    public List<ActivityDto> getSelectedProjectActivityPerDay(
            @PathVariable long projectId,
            @PathVariable int year,
            @PathVariable int month,
            @PathVariable int day
    ){
        LocalDate date = LocalDate.of(year, month, day);
        return activityService.getAllActivitiesPerDayForProject(projectId,date);
    }

    @PostMapping("/save")
    public ResponseEntity<Void> saveActivity(@RequestBody Activity activity) {
        activityService.saveActivity(activity);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(activity.getId())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<Void> deleteActivity(@PathVariable long id) {
        boolean status = activityService.deleteActivity(id);
        return status ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
    }

}
