class Block < ApplicationRecord
  has_many :histories, inverse_of: :block, dependent: :destroy
end
