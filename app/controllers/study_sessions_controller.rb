class StudySessionsController < ApplicationController

	before_filter :login_required

	def index
		@study_sessions = StudySession.all

		respond_to do |format|
			format.html
			format.xml  { render :xml  => @study_sessions }
			format.json { render :json => @study_sessions }
		end
	end

	# END:authentication

	def show
		@study_session = StudySession.find(params[:id])
		@photo = Photo.new
		respond_to do |format|
			format.html
			format.xml  { render :xml  => @study_session }
			format.json { render :json => @study_session }
		end
	end

	def new
		
		@study_session = StudySession.new({:starts_at => Time.now.advance(:days => 2)})
		respond_to do |format|
			format.html
			format.xml  { render :xml  => @study_session }
			format.json { render :json => @study_session }
		end
	end

	def edit
		@study_session = StudySession.find(params[:id])
	end

	def create
		@study_session = StudySession.new(params[:study_session])

		respond_to do |format|
			if @study_session.save
				format.html { redirect_to @study_session }
				format.xml  { render :xml  => @study_session, :status => :created, :location => @study_session }
				format.json { render :json => @study_session, :status => :created, :location => @study_session }
			else
				format.html { render :action => "new" }
				format.xml  { render :xml => @study_session.errors, :status => :unprocessable_entity }
				format.json { render :xml => @study_session.errors, :status => :unprocessable_entity }
			end
		end
	end

	def update
		@study_session = StudySession.find(params[:id])

		respond_to do |format|
			if @study_session.update_attributes(params[:study_session])
				format.html { redirect_to @study_session }
				format.any(:xml, :json) { head :ok }
			else
				format.html { render :action => "edit" }
				format.xml  { render :xml  => @study_session.errors, :status => :unprocessable_entity }
				format.json { render :json => @study_session.errors, :status => :unprocessable_entity }
			end
		end
	end

	def destroy
		@study_session = StudySession.find(params[:id])
		@study_session.destroy

		respond_to do |format|
			format.html { redirect_to(study_sessions_url) }
			format.any(:xml, :json) { head :ok }
		end
	end

end
