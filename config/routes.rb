Rails.application.routes.draw do
  root 'static_pages#index'
  get '/api/v1/mining', to: 'blocks#start'
  post '/api/v1', to: 'blocks#reload'
  resources :blocks
  resources :histories
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
