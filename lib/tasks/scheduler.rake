task :reset_demo => :environment do
  puts "Cleaning Up The DB..."
  DatabaseCleaner.strategy = :deletion
  DatabaseCleaner.clean
  puts "Seeding the DB again..."
  Rake::Task["db:seed"].invoke
  puts "done!"
end