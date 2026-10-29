# SwiftCart — Full-stack e-commerce MVP

**Stack:** React + Vite frontend, Java 17 + Spring Boot backend, H2 database by default, optional MySQL profile.

## Requirements
- Java 17+
- Node.js 20+ and npm
- Internet for first-time dependency downloads

## Run backend
Open a terminal in `backend`:
- Windows: `mvn spring-boot:run`
- macOS/Linux: `mvn spring-boot:run`

If Maven is not installed, install Maven or import `backend/pom.xml` in IntelliJ IDEA and run `SwiftCartApplication`. Backend: `http://localhost:8080`; health check: `http://localhost:8080/api/health`.

## Run frontend
In another terminal, enter `frontend` and run:
```bash
npm install
npm run dev
```
Open `http://localhost:5173`.

## Database
H2 is used by default and resets on backend restart. H2 console: `http://localhost:8080/h2-console`, JDBC URL `jdbc:h2:mem:swiftcartdb`, username `sa`, blank password.

Optional MySQL: create database `swiftcart`; set `DB_URL`, `DB_USERNAME`, and `DB_PASSWORD`; then run backend with profile `mysql` (`SPRING_PROFILES_ACTIVE=mysql`). Never commit real credentials.

## API
- `GET /api/health`
- `GET /api/products?search=phone&category=Electronics`
- `GET /api/products/{id}`
- `GET /api/categories`
- `POST /api/orders`
- `GET /api/orders/{id}`

Order JSON example:
```json
{"customerName":"Aman Kumar","email":"aman@example.com","deliveryAddress":"Meerut, Uttar Pradesh","items":[{"productId":1,"quantity":2}]}
```

## Included
Product browsing, search/category filters, cart, checkout form, server-side price/stock validation, order confirmation, seeded sample products, error responses, privacy page, responsive styling.

**Limitations:** Educational MVP only. No login, admin authorization, real payment processing, or shipping integration. Do not enter real sensitive data or deploy publicly without a security review.
