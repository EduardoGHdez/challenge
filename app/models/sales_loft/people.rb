# frozen_string_literal: true

module SalesLoft
  class People
    def self.list
      @list = ::SalesLoft::CollectionObject.new(
        Client.get("/v2/people.json")
      )
    end
  end
end
