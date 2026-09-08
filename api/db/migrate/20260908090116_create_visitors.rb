class CreateVisitors < ActiveRecord::Migration[7.2]
  def change
    create_table :visitors do |t|
      t.string :full_name
      t.string :company_name
      t.text :purpose
      t.datetime :checked_in_at
      t.datetime :checked_out_at
      t.boolean :active, default: true, null: false
      t.references :host, foreign_key: true

      t.timestamps
    end
  end
end
