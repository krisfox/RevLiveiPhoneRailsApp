class CreateUserStudySessions < ActiveRecord::Migration
  def self.up
    create_table :user_study_sessions do |t|
      t.integer :user_id
      t.integer :study_session_id
      t.datetime :last_notified
      t.timestamps
    end
	add_index :user_study_sessions, [:user_id, :study_session_id]
  end

  def self.down
    drop_table :user_study_sessions
  end
end
