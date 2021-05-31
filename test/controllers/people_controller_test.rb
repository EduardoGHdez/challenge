require "test_helper"

class PeopleControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    VCR.use_cassette("sales_loft/people/list", record: :none) do
      get "/"
      assert_response :success
    end
  end
end
