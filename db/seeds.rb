AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?

def add_user_to_team(user_id, team_id)
  # get team and user by ID
  @team = Team.find(team_id)
  @user = User.find(user_id)
  # add member to team
  @team.members << @user
  # for each project on the team, add that project to the users
  @team.projects.each do |project|
    @user.projects << project
  end
end

User.create!([
  {first_name: 'Taylor', last_name: 'Fuller', email: 'test@example.com', password: 'password', password_confirmation: 'password'},
  {first_name: 'Samantha', last_name: 'Embree',email: 'test2@example.com', password: 'password', password_confirmation: 'password'},
  {first_name: 'Dylan', last_name: 'Greening',email: 'test3@example.com', password: 'password', password_confirmation: 'password'},
  {first_name: 'Sherlock', last_name: '',email: 'test4@example.com', password: 'password', password_confirmation: 'password'},
  {first_name: 'Chester', last_name: '',email: 'test5@example.com', password: 'password', password_confirmation: 'password'}
])

Team.create!([
  {name: "Engineering", lead_id: 1},
  {name: "Marketing", lead_id: 1},
  {name: "Recruiting", lead_id: 1},
  {name: "Sales", lead_id: 1}
])

Project.create!([
  {name: "Engineering Project 1", description: "Description - Engineering Project 1", lead_id: 1, team_id: 1},
  {name: "Engineering Project 2", description: "Description - Engineering Project 2", lead_id: 1, team_id: 1},
  {name: "Engineering Project 3", description: "Description - Engineering Project 3", lead_id: 1, team_id: 1},
  {name: "Engineering Project 4", description: "Description - Engineering Project 4", lead_id: 1, team_id: 1},
  {name: "Engineering Project 5", description: "Description - Engineering Project 5", lead_id: 1, team_id: 1},
  {name: "Engineering Project 6", description: "Description - Engineering Project 6", lead_id: 1, team_id: 1},
  {name: "Engineering Project 7", description: "Description - Engineering Project 7", lead_id: 1, team_id: 1},
  {name: "Marketing Project 1", description: "Description - Marketing Project 1", lead_id: 1, team_id: 2},
  {name: "Marketing Project 2", description: "Description - Marketing Project 2", lead_id: 1, team_id: 2},
  {name: "Marketing Project 3", description: "Description - Marketing Project 3", lead_id: 1, team_id: 2},
  {name: "Recruiting Project 1", description: "Description - Recruiting Project 1", lead_id: 2, team_id: 3},
  {name: "Recruiting Project 2", description: "Description - Recruiting Project 2", lead_id: 2, team_id: 3},
  {name: "Recruiting Project 3", description: "Description - Recruiting Project 3", lead_id: 2, team_id: 3}
])

Task.create!([
  {title: "Engineering Project 1 Task 1", description: "Description - Engineering Project 1 Task 1", completed: false, due_date: "2021-10-22T23:15:29.947Z", creator_id: 1, assignee_id: 1, project_id: 1, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 1 Task 2", description: "Description - Engineering Project 1 Task 2", completed: false, due_date: "2021-10-27T23:15:29.947Z", creator_id: 1, assignee_id: 1, project_id: 1, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 1 Task 3", description: "Description - Engineering Project 1 Task 3", completed: false, due_date: "2021-10-25T23:15:29.947Z", creator_id: 1, assignee_id: 1, project_id: 1, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 1 Task 4", description: "Description - Engineering Project 1 Task 4", completed: false, due_date: "2021-10-30T23:15:29.947Z", creator_id: 1, assignee_id: 2, project_id: 1, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 1 Task 5", description: "Description - Engineering Project 1 Task 5", completed: false, due_date: "2021-10-19T23:15:29.947Z", creator_id: 1, assignee_id: 4, project_id: 1, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 1 Task 6", description: "Description - Engineering Project 1 Task 6", completed: false, due_date: "2021-10-25T23:15:29.947Z", creator_id: 1, assignee_id: 3, project_id: 1, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 1 Task 7", description: "Description - Engineering Project 1 Task 7", completed: false, due_date: "2021-10-27T23:15:29.947Z", creator_id: 1, assignee_id: 1, project_id: 1, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 2 Task 1", description: "Description - Engineering Project 2 Task 1", completed: false, due_date: "2021-10-22T23:15:29.947Z", creator_id: 1, assignee_id: 1, project_id: 2, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 2 Task 2", description: "Description - Engineering Project 2 Task 1", completed: false, due_date: "2021-10-27T23:15:29.947Z", creator_id: 1, assignee_id: 1, project_id: 2, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 2 Task 3", description: "Description - Engineering Project 2 Task 2", completed: false, due_date: "2021-10-25T23:15:29.947Z", creator_id: 1, assignee_id: 1, project_id: 2, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 2 Task 4", description: "Description - Engineering Project 2 Task 3", completed: false, due_date: "2021-10-30T23:15:29.947Z", creator_id: 1, assignee_id: 2, project_id: 2, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 2 Task 5", description: "Description - Engineering Project 2 Task 4", completed: false, due_date: "2021-10-19T23:15:29.947Z", creator_id: 1, assignee_id: 4, project_id: 2, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 2 Task 6", description: "Description - Engineering Project 2 Task 5", completed: false, due_date: "2021-10-25T23:15:29.947Z", creator_id: 1, assignee_id: 3, project_id: 2, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 2 Task 7", description: "Description - Engineering Project 2 Task 6", completed: false, due_date: "2021-10-27T23:15:29.947Z", creator_id: 1, assignee_id: 1, project_id: 2, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 3 Task 1", description: "Description - Engineering Project 3 Task 1", completed: false, due_date: "2021-10-22T23:15:29.947Z", creator_id: 1, assignee_id: 1, project_id: 3, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 3 Task 2", description: "Description - Engineering Project 3 Task 2", completed: false, due_date: "2021-10-27T23:15:29.947Z", creator_id: 1, assignee_id: 1, project_id: 3, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 3 Task 3", description: "Description - Engineering Project 3 Task 3", completed: false, due_date: "2021-10-25T23:15:29.947Z", creator_id: 1, assignee_id: 1, project_id: 3, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 3 Task 4", description: "Description - Engineering Project 3 Task 4", completed: false, due_date: "2021-10-30T23:15:29.947Z", creator_id: 1, assignee_id: 2, project_id: 3, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 3 Task 5", description: "Description - Engineering Project 3 Task 5", completed: false, due_date: "2021-10-19T23:15:29.947Z", creator_id: 1, assignee_id: 4, project_id: 3, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 3 Task 6", description: "Description - Engineering Project 3 Task 6", completed: false, due_date: "2021-10-25T23:15:29.947Z", creator_id: 1, assignee_id: 3, project_id: 3, parent_task_id: nil, team_id: 1},
  {title: "Engineering Project 3 Task 7", description: "Description - Engineering Project 3 Task 7", completed: false, due_date: "2021-10-27T23:15:29.947Z", creator_id: 1, assignee_id: 1, project_id: 3, parent_task_id: nil, team_id: 1},
])

add_user_to_team(1, 1)
add_user_to_team(1, 2)
add_user_to_team(1, 3)
add_user_to_team(1, 4)
add_user_to_team(2, 1)
add_user_to_team(3, 1)
add_user_to_team(4, 1)
add_user_to_team(3, 2)
add_user_to_team(4, 2)
add_user_to_team(5, 1)

tasks = Task.all
tasks.each do |task|
    if task.assignee_id
        UserTask.create!(member_id: task.assignee_id, task_id: task.id)
    end
end