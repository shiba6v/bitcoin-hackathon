Rails.application.routes.draw do
  root 'static_pages#index'
  get '/api/v1/mining', to: 'blocks#start'
  post '/api/v1/mining', to: 'blocks#reload'
  get '/api/v1/analytics', to: 'blocks#analytics'
  resources :blocks, only: :index
  resources :histories, only: :index
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
