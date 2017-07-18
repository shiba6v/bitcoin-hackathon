class History < ApplicationRecord
  belongs_to :block, inverse_of: :histories
end
