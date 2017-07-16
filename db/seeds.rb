# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
a = Api.new

a.prev_block = "0000000000000000011e41ee8a75d92a05555589d53f25627ac8226192ddfe53"
a.bits = 402742748
a.prev_timestamp = "2017-07-15 04:48:47"
a.markle_root = "b440b224c33a8d34a35fdcd856b59f4cdfe6294bb2d318b58a40317be4d771b6"
a.version = 0x20000002
a.save
