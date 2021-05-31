# frozen_string_literal: true

ENV['RAILS_ENV'] ||= 'test'
require_relative "../config/environment"
require "rails/test_help"

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  VCR.configure do |config|
    config.cassette_library_dir = "test/vcr_cassettes"
    config.hook_into :webmock
    config.filter_sensitive_data('<BEARER_TOKEN>') do |interaction|
      auths = interaction.request.headers['Authorization'].first
      if (match = auths.match /^Bearer\s+([^,\s]+)/ )
        match.captures.first
      end
    end
  end
end
