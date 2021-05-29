class PeopleController < ApplicationController
  def index
    @people = SalesLoft::People.list.map do |person|
      person.to_h.deep_transform_keys! { |key| key.to_s.camelize :lower }
    end
  end
end
