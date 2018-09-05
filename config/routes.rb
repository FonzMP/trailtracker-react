Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  root to: "application#welcome"
  resources :users do
    resources :trails, only: [:new, :create, :index]
  end
  resources :trails
  resources :trail_ratings, only: [:index, :show, :create, :edit, :destroy, :update]
  post '/trail_ratings', to: "trail_ratings#create"
  get '/trails_rated', to: "trail_ratings#rated_trails"
  get '/signup', to: "users#new"
  get '/login', to: "sessions#new"
  post '/login', to: "sessions#create"
  get '/auth/facebook/callback', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
  delete '/logout', to: "sessions#destroy"
end
