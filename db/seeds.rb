require 'time'
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
    # Engineering
    # 1 - Lead
    {first_name: 'Larry', last_name: 'Igma', email: 'ligma@fakecompany.com', password: 'password', password_confirmation: 'password'},
    # 2 - devops
    {first_name: 'James', last_name: 'Karine', email: 'tkarine@fakecompany.com', password: 'password', password_confirmation: 'password'},
    # 3 - frontend
    {first_name: 'Alexandra', last_name: 'Keira',email: 'akeira@fakecompany.com', password: 'password', password_confirmation: 'password'},
    # 4 - backend
    {first_name: 'Ivan', last_name: 'Giuditta',email: 'igiuditta@fakecompany.com', password: 'password', password_confirmation: 'password'},
    # 5 - DB
    {first_name: 'Gerald', last_name: 'Ulric',email: 'gulric@fakecompany.com', password: 'password', password_confirmation: 'password'},
    # 6 - intern
    {first_name: 'Samantha', last_name: 'Stephens',email: 'sstephens@fakecompany.com', password: 'password', password_confirmation: 'password'},

    # Marketing
    # 7 - lead
    {first_name: 'Marina', last_name: 'Martin',email: 'mmartin@fakecompany.com', password: 'password', password_confirmation: 'password'},
    # 8 - social media
    {first_name: 'Bruno', last_name: 'Reidar',email: 'breidar@fakecompany.com', password: 'password', password_confirmation: 'password'},
    # 9 - outreach
    {first_name: 'Taylor', last_name: 'Paul',email: 'tpaul@fakecompany.com', password: 'password', password_confirmation: 'password'},
    # 10 - itern
    {first_name: 'Sean', last_name: 'Amalia',email: 'samalia@fakecompany.com', password: 'password', password_confirmation: 'password'},

    # Sales
    # 11 - manager
    {first_name: 'Elizabeth', last_name: 'Johnson',email: 'ejohnson@fakecompany.com', password: 'password', password_confirmation: 'password'},
    # 12 - sales
    {first_name: 'Dylan', last_name: 'Ensio',email: 'densio@fakecompany.com', password: 'password', password_confirmation: 'password'},
    # 13 - sales
    {first_name: 'Gale', last_name: 'Stark',email: 'gstark@fakecompany.com', password: 'password', password_confirmation: 'password'}
])

Team.create!([
    {name: "Engineering", lead_id: 1},
    {name: "Marketing", lead_id: 7},
    {name: "Sales", lead_id: 11},
])

Project.create!([
    # Engineering
    {name: "Forwards App", description: "Create project management app", lead_id: 1, team_id: 1},

    # Marketing
    {name: "Market our Forwards App", description: "While engineering works on the Forwards app we need to work on our marketing plan", lead_id: 7, team_id: 2},
    {name: "Market more things", description: "While we're not marketing things, we should work on marketing things", lead_id: 7, team_id: 2},

    # Sales
    {name: "Sell licenses for Forwards", description: "We need to work on selling licenses to companies to use our Forwards App", lead_id: 11, team_id: 3},
    {name: "Sell more things", description: "Let's work on selling more things", lead_id: 11, team_id: 3},
])

date = Date.today

Task.create!([
    # Engineering
    {
        title: "Setup dev environment",
        description: "We need to set up dev environment for React on Rails",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-30,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-35,
        creator_id: 1,
        assignee_id: 2,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Design database schemas",
        description: "We need users, teams, projects, and tasks.",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-30,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-35,
        creator_id: 1,
        assignee_id: 5,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Setup routes and views",
        description: "We need routes setup for the login component and within the API namespace",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-30,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-35,
        creator_id: 1,
        assignee_id: 4,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Create controllers and models",
        description: "We need API controllers and the model associations set up",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-30,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-35,
        creator_id: 1,
        assignee_id: 4,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Get started on frontend",
        description: "Let's start with creating an always visible sidebar for navigation",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-25,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-30,
        creator_id: 1,
        assignee_id: 6,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Add 'Dashboard', 'My Tasks', 'My Projects', 'My Teams' sections",
        description: "Each sections should have a dedicated space on the sidebar",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-24,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-25,
        creator_id: 1,
        assignee_id: 3,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Get creation operations working for teams, projects, and tasks",
        description: "We will loop back to update and destroy later",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-24,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-25,
        creator_id: 1,
        assignee_id: 4,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Add CRUD modal",
        description: "Add a user modal to be used for CRUD operations",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-22,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-25,
        creator_id: 1,
        assignee_id: 6,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Integrate Redux",
        description: "Create actions, dispatches, and reducers for teams, projects, tasks, and UI",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-21,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-24,
        creator_id: 1,
        assignee_id: 3,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Add sections for active team that shows all project, and active project that shows all tasks",
        description: "Redux store will handle UI options and active options",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-21,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-24,
        creator_id: 1,
        assignee_id: 3,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Flesh out backend CRUD operation verification",
        description: "Add CRUD constraints",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-20,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-23,
        creator_id: 1,
        assignee_id: 4,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Add backend sorting of teams, projects, and tasks",
        description: "Bundle sorted items in with JSON response",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-19,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-23,
        creator_id: 1,
        assignee_id: 6,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Add Redux actions and dispatching to handle all UI actions and save store to localStorage to reduce loading times",
        description: "Need actions/dispatchers for CRUD, UI, errors, and loading",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-19,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-23,
        creator_id: 1,
        assignee_id: 3,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Wrap up CRUD operations on the frontend",
        description: "Need ability to create, update, and destroy items - all using the same modal",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-17,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-22,
        creator_id: 1,
        assignee_id: 3,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Wrap up CRUD operations on the backend",
        description: "Need ability to create, update, and destroy items",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-12,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-15,
        creator_id: 1,
        assignee_id: 4,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Wrap up error handling on frontend",
        description: "Use redux to communicate any errors from Rails API response",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-9,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-10,
        creator_id: 1,
        assignee_id: 3,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Revise DB seeds to be used on production environment to showcase app",
        description: "We will schedule a DB update every day that purges, migrates, and reseeds itself",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-3,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-5,
        creator_id: 1,
        assignee_id: 6,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Frontend QC",
        description: "We don't want to make it fully responsive, however, it should accomodate regualar displays",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-3,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-5,
        creator_id: 1,
        assignee_id: 3,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Deploy to Heroku / Production QC",
        description: "Report any errors or issues",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-1,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-2,
        creator_id: 1,
        assignee_id: 2,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Add backend functionality for favorites section",
        description: "Report any errors or issues",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00'),
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-1,
        creator_id: 1,
        assignee_id: 1,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Add frontend functionality for favorites section",
        description: "Report any errors or issues",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00'),
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-1,
        creator_id: 1,
        assignee_id: 1,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Add functionality for task comments",
        description: "Report any errors or issues",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')+2,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-1,
        creator_id: 1,
        assignee_id: 1,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Add frontend sorting/searching for projects, teams, tasks",
        description: "Each list section should have a sort-by and search functionality",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')+3,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-1,
        creator_id: 1,
        assignee_id: 1,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Revise application in order to provide better scaling",
        description: "This app needs some modifications done in order to scale more effectively",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')+5,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00'),
        creator_id: 1,
        assignee_id: 1,
        project_id: 1,
        team_id: 1
    },
    {
        title: "Add server side cache to lessen SQL queries",
        description: "Need to learn Redis first",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')+10,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00'),
        creator_id: 1,
        assignee_id: 1,
        project_id: 1,
        team_id: 1
    },

    # Marketing
    {
        title: "Market stuff",
        description: "We need to market some stuff",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-1,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-2,
        creator_id: 9,
        assignee_id: 10,
        project_id: 2,
        team_id: 2
    },
    {
        title: "Market some more stuff",
        description: "We need to market some more stuff",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00'),
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-2,
        creator_id: 9,
        assignee_id: 7,
        project_id: 2,
        team_id: 2
    },
    {
        title: "Market this",
        description: "We need to market this",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')+1,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-1,
        creator_id: 9,
        assignee_id: 9,
        project_id: 2,
        team_id: 2
    },
    {
        title: "Market this and that",
        description: "We need to market this and that",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')+4,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00'),
        creator_id: 9,
        assignee_id: 8,
        project_id: 3,
        team_id: 2
    },
    {
        title: "Market market market",
        description: "Always gotta market",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-1,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-2,
        creator_id: 9,
        assignee_id: 10,
        project_id: 3,
        team_id: 2
    },
    {
        title: "Market our marketing",
        description: "Let's try to market our marketing",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00'),
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-2,
        creator_id: 9,
        assignee_id: 7,
        project_id: 3,
        team_id: 2
    },
    {
        title: "Market this, that, and those",
        description: "We need to market this, that, and those",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')+1,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-1,
        creator_id: 9,
        assignee_id: 9,
        project_id: 3,
        team_id: 2
    },
    {
        title: "Market market market, all day",
        description: "Market every day",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')+4,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00'),
        creator_id: 9,
        assignee_id: 8,
        project_id: 3,
        team_id: 2
    },

    # Sales
    {
        title: "Outreach to companies to sell our Forwards app",
        description: "Let's focus on B2B and then move into B2C",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-5,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-10,
        creator_id: 11,
        assignee_id: 11,
        project_id: 4,
        team_id: 3
    },
    {
        title: "Hire more salespeople",
        description: "We have a lot of stuff to sell",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')+1,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-1,
        creator_id: 11,
        assignee_id: 11,
        project_id: 4,
        team_id: 3
    },
    {
        title: "Learn sales",
        description: "'Sell me this pen'",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')+1,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-1,
        creator_id: 11,
        assignee_id: 13,
        project_id: 4,
        team_id: 3
    },
    {
        title: "Learn to sell things",
        description: "We can learn a lot from a paper company in Scranton, PA",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')+1,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-1,
        creator_id: 11,
        assignee_id: 13,
        project_id: 4,
        team_id: 3
    },
    {
        title: "Sell our SaaS that is causing disruption in the project management space",
        description: "Wow, so disruptive",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')+1,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-1,
        creator_id: 11,
        assignee_id: 11,
        project_id: 4,
        team_id: 3
    },
    {
        title: "Sell things",
        description: "We need to sell some things",
        completed: true,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-5,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-10,
        creator_id: 11,
        assignee_id: 11,
        project_id: 5,
        team_id: 3
    },
    {
        title: "Sell more things",
        description: "We really need to look at selling more things",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')+1,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-1,
        creator_id: 11,
        assignee_id: 12,
        project_id: 5,
        team_id: 3
    },
    {
        title: "Sell more of this, and more of that",
        description: "Sell, sell, sell",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')+1,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-1,
        creator_id: 11,
        assignee_id: 13,
        project_id: 5,
        team_id: 3
    },
    {
        title: "Sell this",
        description: "Make sure we sell this",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')+1,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-1,
        creator_id: 11,
        assignee_id: 13,
        project_id: 5,
        team_id: 3
    },
    {
        title: "Sell that",
        description: "Make sure we sell that",
        completed: false,
        due_date: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')+1,
        created_at: DateTime.new(date.year, date.month, date.day, 17, 0, 0, '-7:00')-1,
        creator_id: 11,
        assignee_id: 11,
        project_id: 5,
        team_id: 3
    }
])

# Engineering
add_user_to_team(1, 1)
add_user_to_team(2, 1)
add_user_to_team(3, 1)
add_user_to_team(4, 1)
add_user_to_team(5, 1)
add_user_to_team(6, 1)

# Marketing
add_user_to_team(1, 2)
add_user_to_team(7, 2)
add_user_to_team(8, 2)
add_user_to_team(9, 2)
add_user_to_team(10, 2)

# Sales
add_user_to_team(1, 3)
add_user_to_team(11, 3)
add_user_to_team(12, 3)
add_user_to_team(13, 3)


tasks = Task.all
tasks.each do |task|
    if task.assignee_id
        UserTask.create!(member_id: task.assignee_id, task_id: task.id)
    end
end