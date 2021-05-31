# frozen_string_literal: true

require 'test_helper'

class SalesLoft::CollectionObjectTest < ActiveSupport::TestCase
  def test_collection_object_behaves_like_enumerable_when_has_data
    collection = SalesLoft::CollectionObject.new({
      "data" => [
        { email: 'homer.simpson@gmail.com' },
        { email: 'bart.simpson@gmail.com' },
        { email: 'lisa.simpson@gmail.com' }
      ]
    })

    assert collection.pluck(:email).grep(/homer.simpson/).include? 'homer.simpson@gmail.com'
  end

  def test_collection_object_with_errors
    collection = SalesLoft::CollectionObject.new({
      "errors" => ["Something went wrong :("]
    })

    assert_equal collection.errors, ["Something went wrong :("]
  end

  def test_errors_are_wrapped_with_array
    collection = SalesLoft::CollectionObject.new({
      "error" => "Something went wrong :("
    })

    assert_equal collection.errors, ["Something went wrong :("]
  end

  def test_metadata
    collection = SalesLoft::CollectionObject.new({
      "metadata" => { page: 5 }
    })

    assert_equal collection.metadata[:page], 5
  end
end
