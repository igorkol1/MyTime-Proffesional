package pl.igorkol.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.igorkol.dtos.ActivityDto;
import pl.igorkol.services.ActivityService;

import java.util.List;

@RestController
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

}
