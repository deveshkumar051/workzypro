#!/bin/bash
echo "Setting up Workzy Platform..."

echo "1. Installing backend dependencies..."
cd backend && npm install && cd ..

echo "2. Installing client frontend dependencies..."
cd frontend-client && npm install && cd ..

echo "3. Installing helper frontend dependencies..."
cd frontend-helper && npm install && cd ..

echo "4. Setting up .env files..."
cp backend/.env.example backend/.env
cp frontend-client/.env.example frontend-client/.env
cp frontend-helper/.env.example frontend-helper/.env

echo ""
echo "Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Edit backend/.env — add DATABASE_URL and SESSION_SECRET"
echo "  2. Run the database schema:"
echo "     psql \$DATABASE_URL -f backend/database/schemas/schema.sql"
echo "     psql \$DATABASE_URL -f backend/database/seeds/services.sql"
echo "  3. Start the backend:   cd backend && npm run dev"
echo "  4. Start client:        cd frontend-client && npm run dev"
echo "  5. Start helper portal: cd frontend-helper && npm run dev"
