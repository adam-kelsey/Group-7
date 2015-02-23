class RemoveForeignKey < ActiveRecord::Migration
  def change
    remove_foreign_key :bids, :auctions
  end
end
