class CreateTrailRatings < ActiveRecord::Migration[5.2]
  def change
    create_table :trail_ratings do |t|
      t.integer :trail_id
      t.integer :user_id
      t.integer :rating

      t.timestamps
    end
  end
end
