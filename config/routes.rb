Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  resources :users do
    resources :trails, only: [:new, :create, :index]
  end
  resources :trails
  resources :trail_ratings, only: [:create, :edit, :destroy, :update]
  get '/signup', to: "users#new"
  get '/login', to: "sessions#new"
  post '/login', to: "sessions#create"
  get '/auth/facebook/callback', to: 'sessions#create'
  delete '/logout', to: "sessions#destroy"
end
