class Photo < ActiveRecord::Base
	belongs_to :study_session
	belongs_to :user
	has_attached_file :photo, :styles => { :large => "800x800>", :medium => "320x320>", :thumb => "100x100#" }

	def as_xml(options={})
		default_serialization_options(options)
		super(options)
	end

	def as_json(options={})
		default_serialization_options(options)
		super(options)
		{"photo" => {
		:id => self.id,
		:taken_by => self.user.username,
    	:user_id => self.user_id,
    	:study_session_id => self.study_session_id,
    	:thumb => self.photo.url(:thumb),
		:large => self.photo.url(:large)
     	}}
	end


	protected

	def default_serialization_options(options={})
		# options[:only] = [:id, :url, :study_session_id, :user_id, :updated_at, :created_at]
	#	options[:only] = [:url]
	end

end
