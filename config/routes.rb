Rails.application.routes.draw do
  get '/api/v1', to: 'apis#start'
  post '/api/v1', to: 'apis#reload'
  resources :apis
  resources :histories
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
