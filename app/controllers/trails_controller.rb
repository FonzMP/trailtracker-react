class TrailsController < ApplicationController

  before_action :current_user
  protect_from_forgery with: :null_session

  def index
    @trails = Trail.all
    render json: @trails, status: 201
  end

  def new
    @trail = Trail.new
  end

  def create
    @trail = Trail.create(trail_params)

    if @trail.save
      render json: @trail, status: 201
    end
  end

  def show
    @trail = Trail.find(params[:id])
    respond_to do |format|
      format.html
      format.json {render json: @trail}
    end
  end

  def edit
    @trail = Trail.find(params[:id])
    invalid_user?
  end


  def update
    @trail = Trail.find(params[:id])
    if !(@current_user.id == @trail.created_by)
      @user = User.find(@current_user.id)
      @trail_rating = TrailRating.new
      @message = ["That is not your trail!"]

      render 'users/show'
    else
      @trail.update(trail_params)
     
      redirect_to trail_path(@trail)
    end
  end

  def destroy
    if !logged_in?
      redirect_to login_path
    else
      @trail = Trail.find(params[:id]).destroy

      redirect_to user_path(@current_user)
    end
  end
  
  private

  def trail_params
    params.require(:trail).permit(:name, :length, :created_by)
  end
end
