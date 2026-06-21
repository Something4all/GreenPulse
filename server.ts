import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "./src/db/index.ts";
import { users } from "./src/db/schema.ts";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_SECRET || "your-secure-dev-secret-key!123";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse JSON
  app.use(express.json());

  // === Authentication API Routes ===

  // 1. User Registration (Sign up)
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      // Check if user already exists
      const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (existingUser.length > 0) {
        return res.status(400).json({ error: "Email already exists." });
      }

      // Hash the password
      // Hashing turns the password into a scrambled string that cannot be easily reversed.
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // Insert into our database
      const [newUser] = await db.insert(users).values({
        name,
        email,
        passwordHash,
      }).returning();

      // Create a Session Token (JWT).
      // This is like a secure digital ID card.
      const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).json({ 
        token, 
        user: { id: newUser.id, name: newUser.name, email: newUser.email } 
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  });

  // 2. User Login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Missing email and password." });
      }

      // Find the user by email
      const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (result.length === 0) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      const userRecord = result[0];

      // Compare the provided password with our stored passwordHash
      const isValidPassword = await bcrypt.compare(password, userRecord.passwordHash);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid email or password." });
      }

      // Provide the JW Token
      const token = jwt.sign({ id: userRecord.id, email: userRecord.email }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ 
        token, 
        user: { id: userRecord.id, name: userRecord.name, email: userRecord.email } 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  });


  // === Vite Integration ===
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve static files from dist
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Start Server
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
