require "test_helper"

class Api::VisitorsDefectsTest < ActionDispatch::IntegrationTest
  # Regression test for Defect 2:
  # "Deactivated visitors must not appear in the active list."
  # The inactive_visitor fixture has active:false but checked_out_at:nil,
  # which the current implementation does not exclude.
  test "index excludes deactivated visitors even when they are not checked out" do
    get "/api/visitors", params: { page: 1 }

    assert_response :success
    ids = JSON.parse(response.body).map { |v| v["id"] }

    assert_not_includes ids, visitors(:inactive_visitor).id,
      "A visitor with active:false must not appear in the active visitor list"
  end

  # Regression test for Defect 1:
  # "Deactivated visitors must not be selectable when registering a repeat visit."
  # The search endpoint powers the autocomplete in the registration form.
  test "search excludes deactivated visitors" do
    get "/api/visitors/search", params: { q: "Sam" }

    assert_response :success
    ids = JSON.parse(response.body).map { |v| v["id"] }

    assert_not_includes ids, visitors(:inactive_visitor).id,
      "A visitor with active:false must not be returned by search"
  end

  # Regression test for the performance defect:
  # serialize calls visitor.host on every element of the list, producing one
  # host query per row (N+1). The fix is to eager-load with includes(:host).
    test "index avoids N+1 queries when serializing host names" do
    10.times do |i|
      host = Host.create!(name: "Perf Host #{i}")
      Visitor.create!(
        full_name: "Perf Visitor #{i}",
        company_name: "Perf Co",
        purpose: "Load test",
        host: host,
        checked_in_at: Time.current,
        active: true
      )
    end

    sql_statements = []
    callback = lambda do |_name, _start, _finish, _id, payload|
      next if payload[:name] == "SCHEMA"
      sql_statements << payload[:sql]
    end

    ActiveSupport::Notifications.subscribed(callback, "sql.active_record") do
      get "/api/visitors", params: { page: 1 }
    end

    assert_response :success

    host_queries = sql_statements.select do |sql|
      sql.match?(/FROM "hosts" WHERE "hosts"\."id" = \?/)
    end

    assert_operator host_queries.length, :<=, 1,
      "Expected at most 1 host query after eager loading, got " \
      "#{host_queries.length}. This is the N+1 pattern."
  end
    
end