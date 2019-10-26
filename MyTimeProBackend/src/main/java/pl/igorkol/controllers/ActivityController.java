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
