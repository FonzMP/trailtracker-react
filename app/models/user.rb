class User < ApplicationRecord
  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 8 }, on: :create

  has_many :trail_ratings
  has_many :trails, through: :trail_ratings

  def unowned_trails
    (Trail.all.map{|t| t.id} - self.trail_ids).map{|id| Trail.find(id)}
  end

  def created_trails
    Trail.where(created_by: self.id)
  end

  def self.most_contributed
    key_holder = 0
    value_holder = 0
    Trail.group(:created_by).count.each do |key, value|
      if value > value_holder
        value_holder = value
        key_holder = key
      end
    end
    User.find(key_holder).username
  end

end
