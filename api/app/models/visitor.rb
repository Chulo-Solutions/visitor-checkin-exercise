class Visitor < ApplicationRecord
  belongs_to :host, optional: true
end
