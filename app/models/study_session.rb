class StudySession < ActiveRecord::Base
	has_many :user_study_sessions, :dependent => :destroy
	has_many :users, :through => :user_study_sessions
	has_many :photos
end
