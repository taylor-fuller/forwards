# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?
User.create!(first_name: 'Taylor', last_name: 'Fuller', email: 'test@example.com', password: 'password', password_confirmation: 'password')
User.create!(first_name: 'Samantha', last_name: 'Embree',email: 'test2@example.com', password: 'password', password_confirmation: 'password')
User.create!(first_name: 'Dylan', last_name: 'Greening',email: 'test3@example.com', password: 'password', password_confirmation: 'password')
User.create!(first_name: 'Sherlock', last_name: '',email: 'test4@example.com', password: 'password', password_confirmation: 'password')