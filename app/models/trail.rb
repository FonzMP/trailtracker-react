class Trail < ApplicationRecord

  has_many :trail_ratings
  has_many :users, through: :trail_ratings

end
