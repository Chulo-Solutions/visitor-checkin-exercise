srand(42)

Visitor.delete_all
Host.delete_all

hosts = Host.create!([
  { name: "Alice Mercer" },
  { name: "Benjamin Okafor" },
  { name: "Carmen Delgado" },
  { name: "David Liang" },
  { name: "Elena Petrov" },
  { name: "Frank Nguyen" },
  { name: "Grace Ihejirika" },
  { name: "Henry Castellano" },
  { name: "Ingrid Sorensen" },
  { name: "James Obi" },
  { name: "Karen Whitfield" },
  { name: "Liam Fitzpatrick" }
])

companies = [
  "Apex Solutions", "Blue River Tech", "Cascade Partners", "Delta Dynamics",
  "Ember Analytics", "Frontier Labs", "Global Insights", "Horizon Ventures",
  "Ironclad Systems", "Jade Consulting", "Keystone Group", "Luminary Co.",
  "Meridian Works", "Nexus Digital", "Orbit Strategies", "Pinnacle Corp",
  "Quantum Edge", "Radiant Media", "Stellar Ops", "Titan Associates"
]

purposes = [
  "Product demo", "Partnership discussion", "Contract review", "Technical interview",
  "Sales meeting", "Onboarding session", "Support visit", "Training",
  "Audit review", "Project kickoff", "Strategy planning", "Budget review",
  "Vendor evaluation", "Executive briefing", "Team introduction"
]

first_names = %w[Ana Bola Chris Dana Emil Faye Glen Hana Ivan Julia Kai Lena
                 Marco Nina Omar Priya Quinn Rosa Sam Tara Uma Vince Wren Xia Yuki Zara
                 Adam Beth Cole Dena Eric Fran Greg Hope Ines Jana]
last_names = %w[Smith Jones Taylor Brown Wilson Davies Evans Thomas Roberts Walker
                White Martin Allen Hall Wood Jackson Clarke Lewis Robinson Kumar]

now = Time.now.utc
base_time = now - 3.days

inactive_positions = [2, 7, 12, 15, 18, 23, 27, 30, 34, 38,
                      41, 45, 49, 52, 56, 60, 64, 68, 72, 77]

kathmandu_offset = (5 * 3600) + (45 * 60)

80.times do |i|
  seconds_offset = (i * 3240 + rand(600)) % (3 * 24 * 3600)
  checked_in = base_time + seconds_offset

  if i == 4
    checked_in = (now - 1.day).beginning_of_day + 23.hours + 30.minutes - kathmandu_offset
  end

  if i == 10
    checked_in = (now - 1.day).beginning_of_day + 1.hour + 5.minutes - kathmandu_offset
  end

  host = hosts[i % hosts.length]
  is_active = !inactive_positions.include?(i)
  checked_out = is_active ? nil : checked_in + rand(3600..14400)

  Visitor.create!(
    full_name: "#{first_names[i % first_names.length]} #{last_names[i % last_names.length]}",
    company_name: companies[i % companies.length],
    purpose: purposes[i % purposes.length],
    checked_in_at: checked_in,
    checked_out_at: checked_out,
    active: is_active,
    host_id: host.id
  )
end
