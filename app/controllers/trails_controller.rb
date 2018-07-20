class TrailsController < ApplicationController

  def index
    @trails = Trail.all
  end

  def new
    @trail = Trail.new
  end

  def create
    @trail = Trail.create(trail_params)
  end
  
  private

  def trail_params
    params.require(:trail).permit(:name, :length)
  end
end
