Rails.application.routes.draw do
  root 'static_pages#index'
  get '/api/v1/mining', to: 'blocks#start'
  post '/api/v1/mining', to: 'blocks#reload'
  get '/api/v1/analytics', to: 'blocks#analytics'
  get '/api/v1/histories', to: 'histories#index_api'
  resources :blocks, only: :index
  resources :histories, only: :index
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :blocks, only: [] do
        collection do
          get :index
          get :latest
          get :range
          post :result
        end
      end

      resources :miners, only: [] do
        collection do
          get :index
        end
      end
    end
  end
end
