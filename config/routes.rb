Rails.application.routes.draw do
  devise_for :users
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  root 'home#index'

  devise_scope :user do
    get "/users" => "devise/registrations#new"
  end

  namespace :api, defaults: { format: :json } do
    resources :projects
    resources :teams
    resources :tasks
    post 'add_user_to_team', to: 'teams#add_user_to_team'
    post 'users', to: 'users#index'
  end
end
