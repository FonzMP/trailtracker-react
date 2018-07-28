class TrailRatingsController < ApplicationController

  before_action :current_user

  def create
    @trail_rating = TrailRating.create(trail_rating_params)
    if @trail_rating
      redirect_to user_path(@trail_rating.user)
    end
  end

  def edit
    @trail_rating = TrailRating.find(params[:id])
  end

  def update
    @trail_rating = TrailRating.find(params[:id])
    @trail_rating.update(trail_rating_params)

    redirect_to user_path(@trail_rating.user)
  end

  def destroy
    @trail_rating = TrailRating.find(params[:id])
    @trail_rating.destroy

    redirect_to trails_path
  end

  private

  def trail_rating_params
    params.require(:trail_rating).permit(:user_id, :trail_id, :rating)
  end
end
