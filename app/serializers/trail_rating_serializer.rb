class TrailRatingSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :trail_id, :rating
  belongs_to :user
  belongs_to :trail
end