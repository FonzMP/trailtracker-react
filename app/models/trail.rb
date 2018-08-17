class Trail < ApplicationRecord

  validates :name, presence: true
  validates :length, presence: true

  has_many :trail_ratings, dependent: :delete_all
  has_many :users, through: :trail_ratings

  def find_user
    User.find(self.created_by)
  end

  def average_rating
    @trail = TrailRating.where(trail_id: self.id)
    sum = 0
    @trail.each {|tr| sum += tr.rating}
    if @trail.length > 0
      sum.to_f / @trail.length.to_f
    else
      "Unrated currently"
    end
  end

  def created_by_username
    @user = User.find(self.created_by)
    @user.username
  end

  def created_by_page
    @user = User.find(self.created_by)
    @user.id
  end

end
