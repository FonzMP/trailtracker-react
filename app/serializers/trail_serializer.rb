class TrailSerializer < ActiveModel::Serializer
  attributes :id, :name, :length, :average_rating
end
