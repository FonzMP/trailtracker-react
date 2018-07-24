class Trail < ApplicationRecord

  has_many :trail_ratings
  has_many :users, through: :trail_ratings

  def find_user
    User.find(self.created_by)
  end

end
