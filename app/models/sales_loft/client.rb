# frozen_string_literal: true

module SalesLoft
  class Client
    class << self
      def get(path)
        JSON.parse(client.get(path, headers).body)
      end

      private

      def client
        uri = URI('https://api.salesloft.com')
        http = Net::HTTP.new(uri.host, uri.port)
        http.use_ssl = true

        http
      end

      def headers
        @headers ||= {
          'Authorization' => "Bearer #{SalesLoft.config.api_key}",
          'Content-Type' => 'application/json',
          'Accept' => 'application/json'
        }
      end
    end
  end
end
