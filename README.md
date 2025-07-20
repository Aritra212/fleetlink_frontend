# FleetLink Frontend

This is the frontend for the FleetLink task, built with Next.js.

## Getting Started

### 1. Clone the Repository

```bash
git clone git@github.com:Aritra212/fleetlink_frontend.git
cd frontend
```

### 2. Install Dependencies

```bash
pnpm install
```

> If you don’t have `pnpm` installed, you can install it with:
>
> ```bash
> npm install -g pnpm
> ```

### 3. Set Up Environment Variables

Create a `.env` file in the `frontend` directory and add the server url.  
For example:

```env
NEXT_PUBLIC_SERVER_URL = "http://localhost:8000"

```

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Build for Production

```bash
pnpm build
pnpm start
```

---

Feel free to update this file with more details as your project grows!
