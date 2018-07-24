class Trail < ApplicationRecord

  has_many :trail_ratings
  has_many :users, through: :trail_ratings

  def find_username
    User.find(self.created_by).username
  end

end
