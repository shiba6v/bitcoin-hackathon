class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_session

    session_id = session[:miner_id]

    if session_id.blank?
      session[:miner_id] = SecureRandom.uuid
      session_id = session[:miner_id]
    end

    session_id
  end
end
