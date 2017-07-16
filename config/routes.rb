Rails.application.routes.draw do
  get '/', to: 'apis#start'
  post '/', to: 'apis#reload'
  resources :apis
  resource :histories
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
