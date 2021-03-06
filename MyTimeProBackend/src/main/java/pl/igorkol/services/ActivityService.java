package pl.igorkol.services;

import com.sun.org.apache.bcel.internal.generic.LUSHR;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.igorkol.dtos.ActivityDto;
import pl.igorkol.dtos.requests.CloneDayRequest;
import pl.igorkol.entities.Activity;
import pl.igorkol.entities.Project;
import pl.igorkol.entities.User;
import pl.igorkol.repositories.ActivityRepository;
import pl.igorkol.repositories.ProjectRepository;
import pl.igorkol.repositories.UserRepository;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
            Optional<User> userOptional = userRepository.findByEmail(activity.getUser().getEmail());
            if (userOptional.isPresent()) {
                activity.setProject(projectOptional.get());
                activity.setUser(userOptional.get());
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
                UserService.mapToUserDto(activity.getUser()),
                activity.getStart(),
                activity.getDuration(),
                activity.getDescription());
    }

    public List<ActivityDto> getAllActivitiesPerDayForUser(String userEmail, LocalDate date) {
        Optional<User> optionalUser = userRepository.findByEmail(userEmail);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getActive()) {
                return activityRepository.findAllByUserIdAndAndStart(user.getId(), date)
                        .stream()
                        .map(ActivityService::mapToActivityDto)
                        .collect(Collectors.toList());
            }
        }
        return new ArrayList<>();
    }

    public List<ActivityDto> getAllActivitiesPerDayForProject(long projectId, LocalDate date) {
        Optional<Project> optionalProject = projectRepository.findById(projectId);
        if (optionalProject.isPresent()) {
            Project project = optionalProject.get();
            return activityRepository.findAllByProjectIdAndAndStart(project.getId(), date)
                    .stream()
                    .map(ActivityService::mapToActivityDto)
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    public List<ActivityDto> getAllActivitiesPerMonth(String userEmail, LocalDate date) {
        Optional<User> optionalUser = userRepository.findByEmail(userEmail);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getActive()) {
                LocalDate endDate = date.with(TemporalAdjusters.lastDayOfMonth());
                return activityRepository.findAllByUserIdAndStartBetween(user.getId(), date, endDate)
                        .stream()
                        .map(ActivityService::mapToActivityDto)
                        .collect(Collectors.toList());
            }
        }
        return new ArrayList<>();
    }

    public List<ActivityDto> getAllActivitiesPerMonth(LocalDate date){
        LocalDate endDate = date.with(TemporalAdjusters.lastDayOfMonth());
        return activityRepository.findAllByStartBetween(date, endDate)
                .stream()
                .map(ActivityService::mapToActivityDto)
                .collect(Collectors.toList());
    }

    public void clone(String userEmail, CloneDayRequest cloneDayRequest) {
        Optional<User> optionalUser = userRepository.findByEmail(userEmail);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<Activity> userActivities = activityRepository.findAllByUserIdAndAndStart(user.getId(), cloneDayRequest.getActivityDate());
            userActivities.forEach(activity -> getDatesBetween(cloneDayRequest.getStartDate(), cloneDayRequest.getEndDate())
                    .forEach(date -> cloneActivity(activity, date)));
        }
    }

    private void cloneActivity(Activity activity, LocalDate date) {
        Activity activityToClone = new Activity(activity.getProject(),
                activity.getUser(),
                date,
                activity.getDuration(),
                activity.getDescription());

        activityRepository.save(activityToClone);
    }

    private List<LocalDate> getDatesBetween(LocalDate start, LocalDate end) {
        return Stream.iterate(start, date -> date.plusDays(1))
                .limit(ChronoUnit.DAYS.between(start, end) + 1)
                .collect(Collectors.toList());
    }
}
