class TrailSerializer < ActiveModel::Serializer
  attributes :id, :name, :length, :average_rating, :created_by_username, :created_by_page
end
