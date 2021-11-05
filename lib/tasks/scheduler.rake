task :reset_demo => :environment do
  puts "Cleaning Up The DB..."
  DatabaseCleaner.strategy = :truncation
  DatabaseCleaner.clean
  puts "Seeding the DB again..."
  Rake::Task["db:seed"].invoke
  puts "done!"
end