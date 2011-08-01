class CreatePhotos < ActiveRecord::Migration
	def self.up
		create_table :photos do |t|
			t.integer :user_id
			t.integer :study_session_id
			t.string :photo_file_name
			t.string :photo_content_type
			t.integer :photo_file_size
			t.datetime :photo_updated_at
			t.timestamps
		end
		add_index :photos, [:user_id, :study_session_id]
	end

	def self.down
		drop_table :photos
	end
end
