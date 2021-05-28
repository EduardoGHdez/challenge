# frozen_string_literal: true

module SalesLoft
  class CollectionObject
    include Enumerable

    attr_accessor :errors, :metadata

    def initialize(response)
      @collection = Array.wrap(response["data"]).map { |object| OpenStruct.new(object) }
      @errors = Array.wrap(response["errors"] || response["error"])
      @metadata = response["metadata"]
    end

    def each(&block)
      @collection.each(&block)
    end
  end
end
