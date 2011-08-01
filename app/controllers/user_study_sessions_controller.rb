class UserStudySessionsController < ApplicationController

	before_filter :login_required

	def index
		@study_sessions = current_user.study_sessions.all

		respond_to do |format|
			format.html
			format.xml  { render :xml  => @study_sessions }
			format.json { render :json => @study_sessions }
		end
	end

	def show
		@study_session = current_user.study_sessions.find(params[:id])

		respond_to do |format|
			format.html
			format.xml  { render :xml  => @study_session }
			format.json { render :json => @study_session }
		end
	end

	# def new
	# 
	# 	@study_session = StudySession.new({:starts_at => Time.now.advance(:days => 2)})
	# 	respond_to do |format|
	# 		format.html
	# 		format.xml  { render :xml  => @study_session }
	# 		format.json { render :json => @study_session }
	# 	end
	# end

	# def edit
	# 	@study_session = StudySession.find(params[:id])
	# end

	def create
		@user_study_session = UserStudySession.new({:user_id => current_user.id, :study_session_id => params[:study_session_id]})

		respond_to do |format|
			if @user_study_session.save
				format.html { redirect_to @user_study_session.study_session }
				format.xml  { render :xml  => @user_study_session.study_session, :status => :created, :location => @user_study_session.study_session }
				format.json { render :json => @user_study_session.study_session, :status => :created, :location => @user_study_session.study_session }
			else
				format.html { render :action => "new" }
				format.xml  { render :xml => @user_study_session.errors, :status => :unprocessable_entity }
				format.json { render :xml => @user_study_session.errors, :status => :unprocessable_entity }
			end
		end
	end

	def destroy
		@user_study_session = UserStudySession.find_by_user_id_and_study_session_id(current_user.id, params[:study_session_id])
		@user_study_session.destroy
logger.info("DEL #{@user_study_session.inspect}")
		respond_to do |format|
			format.html { redirect_to '/user_study_sessions' }
			format.any(:xml, :json) { head :ok }
		end
	end



end
