## Product Management Client

Frontend application for managing products with CRUD operations. This project provides a user-friendly interface to add, update, delete, and view products through a backend API, product show on table with pagination.

## 🚀 Features
- Add new Products
- View product list
- Updateproduct information
- Delete products
- View roduct Pagination 
- Responsive UI

## 🛠 Tech Stack
- Next.js (page routing)
- RTK Query for data fetching
- TypeScript
- TailwindCSS & Shadcn library for UI components

## 📦 Setup Instructions
1. **Clone the repository**
    ```bash
    git clone https://github.com/HimelDvNath/product-management-client.git
    cd product-management-client
    ```
2. **Install dependencies**
   ```bash
   npm install
   ```
## ⚙️ Environment Variables
  Create a .env.local file in the root directory.
  Example:
  ```bash
  NEXT_PUBLIC_API_URL=http://localhost:5000/api
 ```
## How to Run the Frontend
  ```bash
    npm run dev
  ```
 Then open your browser and go to:
  ```bash
    [npm run dev](http://localhost:3000)
  ```
 The frontend will automatically reload when code changes.
 ## 📂 Project Structure
 ```bash
  product-management-client
src/
├── components
 ├── pages/
 |   ├──products
 │   ├── _app.tsx
 │   └── index.tsx
 │
 ├── store/
 │   └── store.ts
 │
 ├── services/
 │   └── productApi.ts
 │
 └── features/
     └── products/
         ├── ProductList.tsx
         ├── ProductForm.tsx
         └── ProductDetails.tsx
