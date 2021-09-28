Rails.application.routes.draw do
  resources :projects
  resources :teams
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users
  root 'home#index'
  
end
