package pl.igorkol.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.igorkol.dtos.ActivityDto;
import pl.igorkol.dtos.UserDto;
import pl.igorkol.entities.Activity;
import pl.igorkol.entities.User;
import pl.igorkol.repositories.ActivityRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    private ActivityRepository activityRepository;

    @Autowired
    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public List<ActivityDto> getAllActivities() {
        return activityRepository.findAll()
                .stream()
                .map(ActivityService::mapToActivityDto)
                .collect(Collectors.toList());
    }

    public ActivityDto getActivity(long id) {
        Activity activity = activityRepository.findById(id).orElse(null);
        if (activity != null) {
            return mapToActivityDto(activity);
        } else {
            return null;
        }
    }

    public static ActivityDto mapToActivityDto(Activity activity) {
        return new ActivityDto(activity.getId(),
                ProjectService.mapToProjectDto(activity.getProject()),
                UserService.mapToUserDto(activity.getWorker()),
                activity.getStart(),
                activity.getDuration(),
                activity.getDescription());
    }


}
