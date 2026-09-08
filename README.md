# Visitor Check-in

A small web application for managing visitor check-ins at an office. Receptionists can register visitors and track who is currently on site; visitors can be checked out when they leave; and administrators can deactivate visitor records.

## Setup

### API (Rails)

Requires Ruby 3.3 and Bundler.

```
cd api
bundle install
rails db:setup
rails s
```

The API runs on `http://localhost:3000`.

### Web (React)

Requires Node 18+.

```
cd web
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Features

- A receptionist can register a visitor with a full name, company name, host employee, and purpose of visit.
- Registered visitors appear in an active visitor list, showing check-in time.
- A visitor can be checked out, which removes them from the active list.
- A visitor record can be deactivated by an administrator. Deactivated visitors must not appear in the active list and must not be selectable when registering a repeat visit.
- The active visitor list is paginated at twenty records per page.
- All times are displayed in the receptionist's local timezone.
