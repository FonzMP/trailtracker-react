class TrailRatingsController < ApplicationController

  def create
    @trail_rating = TrailRating.create(trail_rating_params)
    if @trail_rating
      redirect_to user_path(@trail_rating.user)
    end
  end

  private

  def trail_rating_params
    params.require(:trail_rating).permit(:user_id, :trail_id, :rating)
  end
end
