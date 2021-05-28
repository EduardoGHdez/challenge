# frozen_string_literal: true

require 'test_helper'

class SalesLoft::PeopleTest < ActiveSupport::TestCase
  def test_list
    list = VCR.use_cassette("sales_loft/people/list", record: :none) do
      SalesLoft::People.list
    end

    assert_equal list.to_a.size, 25
    assert list.all?(&:email_address)
    assert list.all?(&:title)
    assert list.all?(&:display_name)
    assert_empty list.errors
  end

  def test_list_metadata_contains_pagination_info
    list = VCR.use_cassette("sales_loft/people/list", record: :none) do
      SalesLoft::People.list
    end

    pagination_info = {
      "per_page" => 25,
      "current_page" => 1,
      "next_page" => 2,
      "prev_page" => nil
    }

    assert_equal list.metadata["paging"], pagination_info
  end

  def test_list_when_api_request_is_invalid
    list = VCR.use_cassette("sales_loft/people/list_with_errors", record: :none) do
      SalesLoft::People.list
    end

    assert_empty list.to_a
    assert list.errors.include?(
      "Bearer token not properly formed, please see documentation at developers.salesloft.com"
    )
  end
end
