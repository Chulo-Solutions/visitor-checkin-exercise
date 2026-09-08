require "test_helper"

class Api::HostsControllerTest < ActionDispatch::IntegrationTest
  test "GET /api/hosts returns json array" do
    get "/api/hosts"
    assert_response :success
    data = JSON.parse(response.body)
    assert_kind_of Array, data
    assert data.all? { |h| h.key?("id") && h.key?("name") }
  end
end
