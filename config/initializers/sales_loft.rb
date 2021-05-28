# frozen_string_literal: true

if Rails.env.production? || ENV["SALESLOFT_CONN_ENABLED"] == "true"
  SalesLoft.configure do |config|
    config.api_key = ENV.fetch("SALESLOFT_API_KEY")
  end
end
