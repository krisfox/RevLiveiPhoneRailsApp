class CreateStudySessions < ActiveRecord::Migration
	def self.up
		create_table :study_sessions do |t|
			t.string :title
			t.string :subject
			t.text	 :notes
			t.datetime :starts_at
			t.timestamps
		end
		add_index :study_sessions, [:subject, :starts_at]
	end

	def self.down
		drop_table :study_sessions
	end
end
