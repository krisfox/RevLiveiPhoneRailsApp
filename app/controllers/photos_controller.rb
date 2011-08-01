# START:nested
class PhotosController < ApplicationController
	

    


# END:nested  
  before_filter :login_required
# START:nested

  before_filter :find_study_session
# END:nested
  
  def index
    @photos = @study_session.photos.all

    respond_to do |format|
      format.html
      format.xml  { render :xml  => @photos }
      format.json { render :json => @photos }
    end
  end
# START:nested

  def show
    @photo = @study_session.photos.find(params[:id])

    respond_to do |format|
      format.html
      format.xml  { render :xml  => @photo }
      format.json { render :json => @photo }
    end
  end
# END:nested

  def new
    @photo = @study_session.photos.build

    respond_to do |format|
      format.html
      format.xml  { render :xml  => @photo }
      format.json { render :json => @photo }
    end
  end

  def edit
    @photo = @study_session.photo.find(params[:id])
  end

  def create
    @photo = @study_session.photos.build(params[:photo])
	@photo.user_id = current_user.id
    respond_to do |format|
      if @photo.save
        format.html { redirect_to @study_session }
        format.xml  { render :xml => @photo, :status => :created, :location => [@study_session, @photo] }
        format.json { render :json => @photo, :status => :created, :location => [@study_session, @photo] }
        format.js
      else
        format.html { render :action => "new" }
        format.xml  { render :xml  => @photo.errors, :status => :unprocessable_entity }
        format.json { render :json => @photo.errors, :status => :unprocessable_entity }
        format.js do
          render :update do |page| 
            flash[:error] = @photo.errors.full_messages.to_sentence
            page.redirect_to @study_session 
          end
        end
      end
    end
  end

  def update
    @photo = @study_session.photos.find(params[:id])

    respond_to do |format|
      if @photo.update_attributes(params[:photo])
        format.html { redirect_to @study_session }
        format.any(:xml, :json) { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml  => @photo.errors, :status => :unprocessable_entity }
        format.json { render :json => @photo.errors, :status => :unprocessable_entity }
      end
    end
  end

  def destroy
    @photo = @study_session.photos.find(params[:id])
    @photo.destroy

    respond_to do |format|
      format.html { redirect_to @study_session }
      format.js   { render 'create'}
      format.any(:xml, :json) { head :ok }
    end
  end
# START:nested
  
protected

  def find_study_session
    @study_session = StudySession.find(params[:study_session_id])
  rescue ActiveRecord::RecordNotFound
    flash[:error] = "Invalid goal."
    redirect_to @study_session
  end
  
end
# END:nested
