# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150222234236) do

  create_table "arts", force: :cascade do |t|
    t.string   "title",        limit: 255
    t.text     "description",  limit: 65535
    t.string   "artist",       limit: 255
    t.string   "dimensions",   limit: 255
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "image_url",    limit: 255
    t.integer  "bid_amount",   limit: 4
    t.integer  "bid",          limit: 4
    t.integer  "total_amount", limit: 4
    t.string   "bidder",       limit: 255
  end

  create_table "auctions", force: :cascade do |t|
    t.datetime "startx"
    t.datetime "endx"
    t.integer  "startingbid", limit: 4
    t.integer  "art_id",      limit: 4
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.integer  "bid_amount",  limit: 4
  end

  add_index "auctions", ["art_id"], name: "index_auctions_on_art_id", using: :btree

  create_table "bids", force: :cascade do |t|
    t.integer  "amount",     limit: 4
    t.string   "bidder",     limit: 255
    t.integer  "auction_id", limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_index "bids", ["auction_id"], name: "index_bids_on_auction_id", using: :btree

  add_foreign_key "auctions", "arts"
  add_foreign_key "bids", "auctions"
end
