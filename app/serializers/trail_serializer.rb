class TrailSerializer < ActiveModel::Serializer
  attributes :id, :name, :length, :average_rating, :created_by_username, :created_by_page

  def created_by_username
    user = User.find(object.created_by)
    user.username
  end

  def created_by_page
    user = User.find(object.created_by)
    user.id
  end
end
