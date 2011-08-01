class UserStudySession < ActiveRecord::Base
	belongs_to :user
	belongs_to :study_session
end
