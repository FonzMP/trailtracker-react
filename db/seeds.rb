# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Trail.destroy_all
TrailRating.destroy_all

a = User.create(username: "FonzMP", password: "password", email: "fonzmp@gmail.com")
ph = User.create(username: "Phteve", password: "password", email: "steve@steve.com")
alex = User.create(username: "Alex.Wilson", password: "password", email: "aw225404@ohio.edu")

dc = Trail.create(name: "Dead Cow Trail", length: 8.6)
two = Trail.create(name: "22 Day Trail", length: 36.2)
cs = Trail.create(name: "Camper Shell", length: 10.8)

TrailRating.create(trail_id: dc.id, user_id: a.id, rating: 3)
TrailRating.create(trail_id: two.id, user_id: ph.id, rating: 4)

