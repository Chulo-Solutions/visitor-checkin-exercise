Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    get "visitors/search", to: "visitors#search"
    resources :visitors, only: [:index, :create] do
      member do
        patch :check_out
        patch :deactivate
      end
    end
    resources :hosts, only: [:index]
  end
end
