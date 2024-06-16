import { json, type RequestHandler } from "@sveltejs/kit";
import pool from "$lib/db";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export const POST: RequestHandler = async ({ request }) => {
  try {
    
    const {
      Username,
      Password,
      Email,
      PhoneNumber,
      StreetAndNumber,
      City,
      PostalCode,
    } = await request.json();
    
    const existingUser: any[] = await pool.query(
      "SELECT count(userId) AS count FROM users WHERE Email = ?",
      [Email]
    );
    if (existingUser[0][0].count > 0) {
      return new Response(JSON.stringify({ error: "Email already taken" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    await pool.query(
      "INSERT INTO users (Username, Password, Email, PhoneNumber, StreetAndNumber, City, PostalCode) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        Username,
        hashedPassword,
        Email,
        PhoneNumber,
        StreetAndNumber,
        City,
        PostalCode,
      ]
    );
    SendRegisterMail(Username, Email);
    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Registration failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

async function SendRegisterMail(Username: string, EmailTo: string) {
  let transporter = nodemailer.createTransport({
    host: "smtp.seznam.cz",
    port: 465,
    secure: true,
    auth: {
      user: "registrace@3depox.cz",
      pass: "Kaja172004",
    },
  });

  let info = await transporter.sendMail({
    from: '"3DEpox" <registrace@3depox.cz>',
    to: EmailTo,
    subject: "Úspěšná registrace",
    html: `<!DOCTYPE html>
        <html lang='cs'>
        <head>
            <meta charset='UTF-8'>
            <meta http-equiv='X-UA-Compatible' content='IE=edge'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        </head>
        <body style='font-family: Arial, sans-serif; color: black;'>
            <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
                <h2>Registrace úspěšná</h2>
                <p>Dobrý den, ${Username}</p>
                <p>Děkujeme za registraci.</p>
                <p>Vaše registrace byla úspěšně dokončena.</p>
                <p>S pozdravem, 3DEpox</p>
                <img src='https://avatars.githubusercontent.com/u/170137774?s=400&u=ccf5e91e9de78b7f15877f3440d2c1693ee6d8c1&v=4' alt='Obrázek' style='width: 100px'>
            </div>
        </body>
        </html>`,
  });
}
