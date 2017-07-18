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

ActiveRecord::Schema.define(version: 20170717173647) do

  create_table "blocks", force: :cascade do |t|
    t.string   "prev_block"
    t.string   "prev_timestamp",                           null: false
    t.integer  "bits"
    t.string   "markle_root"
    t.string   "result_block"
    t.integer  "version",        limit: 8
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.text     "nonce"
    t.boolean  "is_mined",                 default: false
    t.text     "miner_id"
  end

  create_table "histories", force: :cascade do |t|
    t.integer  "nonce_start", limit: 8,                 null: false
    t.integer  "nonce_end",   limit: 8,                 null: false
    t.string   "prev_block",                            null: false
    t.boolean  "finish",                default: false
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.string   "session_id"
    t.integer  "result"
    t.integer  "block_id"
  end

end
