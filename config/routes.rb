Rails.application.routes.draw do
  devise_for :users
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  root 'home#index'

  devise_scope :user do
    get "/users" => "devise/registrations#new"
  end

  resources :projects
  resources :teams

  namespace :api, defaults: { format: :json } do
    resources :projects
    resources :teams
  end
end
