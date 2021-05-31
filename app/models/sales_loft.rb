# frozen_string_literal: true

module SalesLoft
  Configuration = Struct.new(:api_key)
  @config = Configuration.new

  class << self
    attr_accessor :config
  end

  def self.configure
    yield(@config)
  end
end
