class TrailsController < ApplicationController

  before_action :current_user

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
    render json: @trail, status: 201
  end


  def update
    @trail = Trail.find(params[:id])
    
    @trail.update(trail_params)
     
    render json: @trail, status: 201
  end

  def destroy
    @trail = Trail.find(params[:id]).destroy

    render json: @trail, status: 201
  end
  
  private

  def trail_params
    params.require(:trail).permit(:name, :length, :created_by)
  end
end
