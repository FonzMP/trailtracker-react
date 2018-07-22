class TrailsController < ApplicationController

  def index
    @trails = Trail.all
  end

  def new
    @trail = Trail.new
  end

  def create
    if !current_user
      @message = ["You must be logged in to do that!"]
      
      redirect_to login_path
    else
      @trail = Trail.create(trail_params)

      redirect_to trails_path
    end
  end

  def show
    @trail = Trail.find(params[:id])
  end

  def edit
    @trail = Trail.find(params[:id])
  end


  def update
    @trail = Trail.find(params[:id])
    @trail.update(trail_params)
   
    redirect_to trail_path(@trail)
  end

  def destroy
    @trail = Trail.find(params[:id]).destroy

    redirect_to trails_path
  end
  
  private

  def trail_params
    params.require(:trail).permit(:name, :length)
  end
end
