# frozen_string_literal: true

require 'test_helper'

class SalesLoft::ClientTest < ActiveSupport::TestCase
  def test_valid_request_to_salesloft_api
    response = VCR.use_cassette("sales_loft/client/me", record: :none) do
      SalesLoft::Client.get("/v2/me.json")
    end

    assert_not response["data"].empty?
    assert_equal response["data"]["name"], "Eng Exercise"
  end

  def test_invalid_request_to_salesloft_api
    response = VCR.use_cassette("sales_loft/client/error", record: :none) do
      SalesLoft::Client.get("/invalid_path")
    end

    assert_equal response["error"], "Not Found"
  end
end
