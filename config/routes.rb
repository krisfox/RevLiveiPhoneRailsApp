# START:routes
Saveup::Application.routes.draw do |map|

	resources :goals do
		resources :credits
	end
	
	resources :study_sessions do
		resources :photos
	end
	# END:routes

	root :to => "study_sessions#index"

	map.resources :sessions, :users
	map.resources :user_study_sessions

	match 'login'  => 'sessions#new',     :as => :login
	match 'logout' => 'sessions#destroy', :as => :logout
	match 'join'   => 'users#new',        :as => :join
	match 'about'  => 'info#index',       :as => :about

	# START:routes

end
# END:routes
