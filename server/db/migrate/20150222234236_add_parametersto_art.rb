class AddParameterstoArt < ActiveRecord::Migration
  def change
    add_column :arts, :bid_amount, :integer
    add_column :arts, :bid, :integer
    add_column :arts, :total_amount, :integer
    add_column :arts, :bidder, :string
  end
end
