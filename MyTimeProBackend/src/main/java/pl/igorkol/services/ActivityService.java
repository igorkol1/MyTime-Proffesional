package pl.igorkol.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.igorkol.dtos.ActivityDto;
import pl.igorkol.dtos.UserDto;
import pl.igorkol.entities.Activity;
import pl.igorkol.entities.Project;
import pl.igorkol.entities.User;
import pl.igorkol.repositories.ActivityRepository;
import pl.igorkol.repositories.ProjectRepository;
import pl.igorkol.repositories.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    private ActivityRepository activityRepository;
    private ProjectRepository projectRepository;
    private UserRepository userRepository;

    @Autowired
    public ActivityService(ActivityRepository activityRepository, ProjectRepository projectRepository, UserRepository userRepository) {
        this.activityRepository = activityRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
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

    public Activity saveActivity(Activity activity) {
        Optional<Project> projectOptional = projectRepository.findByName(activity.getProject().getName());
        if (projectOptional.isPresent()) {
            Optional<User> userOptional = userRepository.findByEmail(activity.getWorker().getEmail());
            if (userOptional.isPresent()) {
                activity.setProject(projectOptional.get());
                activity.setWorker(userOptional.get());
                activityRepository.save(activity);
            }
        }
        return activity;
    }

    public boolean deleteActivity(long id) {
        Optional<Activity> activityOptional = activityRepository.findById(id);
        if (activityOptional.isPresent()) {
            activityRepository.delete(activityOptional.get());
            return true;
        }
        return false;
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
