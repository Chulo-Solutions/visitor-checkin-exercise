module Api
  class HostsController < ApplicationController
    def index
      render json: Host.order(:name).map { |h| { id: h.id, name: h.name } }
    end
  end
end
