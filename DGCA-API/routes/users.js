const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { isTokenValid, Response } = require("../helpers/util");

/* GET home page. */
module.exports = function (db) {
  router.get("/", async function (req, res, next) {
    try {
      let reqSQL;
      let argumentSQL;

      reqSQL = "SELECT * FROM users ORDER BY id_user ASC";
      argumentSQL = "";

      const { rows } = await db.query(reqSQL, argumentSQL);
      res.json(new Response(rows));
    } catch (e) {
      console.error(e);
      res.status(500).json(new Response(e, false));
    }
  });
  router.post("/add", async function (req, res, next) {
    //id_region- token
    try {
      const { email_user, username, password, role } = req.body;
      let reqSQL;
      let argumentSQL;
      db.query(
        "SELECT * FROM users WHERE email_user = $1",
        [email_user],
        (err, email) => {
          if (err)
            return res.json(
              new Response({ message: "failed compare emaile" }, false)
            );
          if (email.rows.length > 0)
            return res.json(
              new Response({ message: "e-mail has been registered" }, false)
            );

          db.query(
            "SELECT * FROM users WHERE username = $1",
            [username],
            (err, user) => {
              if (err)
                return res.json(
                  new Response({ message: "failed compare emaile" }, false)
                );
              if (user.rows.length > 0)
                return res.json(
                  new Response(
                    { message: "username has been registered" },
                    false
                  )
                );

              bcrypt.hash(password, saltRounds, async function (err, hash) {
                if (err)
                  return res.json(
                    new Response({ message: "failed hash" }, false)
                  );
                reqSQL =
                  "INSERT INTO users(email_user,username,password,role) VALUES ($1, $2, $3, $4) RETURNING *;";
                argumentSQL = [email_user, username, hash, role];
                const { rows } = await db.query(reqSQL, argumentSQL);
                if (err)
                  return res.json(
                    new Response({ message: "failed insert" }, false)
                  );
                res.json(
                  new Response({
                    data: rows[0],
                  })
                );
              });
            }
          );
        }
      );
    } catch (error) {
      res.json(new Response({ message: "failed add user" }, false));
    }
  });
  router.put("/edit/:id", async function (req, res, next) {
    try {
      if (Object.keys(req.body).length > 4) {
        console.log("password Baru");
        const { email_user, username, password, role } = req.body;
        const email_terpakai = await db.query(
          "SELECT * FROM users WHERE email_user = $1 AND id_user != $2",
          [email_user, req.params.id]
        );
        if (email_terpakai.rows.length > 0)
          return res.json(
            new Response({ message: "e-mail has been registered" }, false)
          );
        const username_terpakai = await db.query(
          "SELECT * FROM users WHERE username = $1 AND id_user != $2",
          [username, req.params.id]
        );
        if (username_terpakai.rows.length > 0)
          return res.json(
            new Response({ message: "username has been registered" }, false)
          );

        bcrypt.hash(password, saltRounds, async function (err, hash) {
          if (err)
            return res.json(new Response({ message: "failed hash" }, false));
          const { rows } = await db.query(
            `UPDATE users SET 
          email_user = $1,
          username = $2,
          password = $3,
          role = $4
          WHERE id_user = $5 RETURNING *;`,
            [email_user, username, hash, role, req.params.id]
          );
          res.json(
            new Response({
              data: rows[0],
            })
          );
        });
      } else {
        console.log("Password Lama");
        const { email_user, username, role } = req.body;
        const email_terpakai = await db.query(
          "SELECT * FROM users WHERE email_user = $1 AND id_user != $2",
          [email_user, req.params.id]
        );
        if (email_terpakai.rows.length > 0)
          return res.json(
            new Response({ message: "e-mail has been registered" }, false)
          );
        const username_terpakai = await db.query(
          "SELECT * FROM users WHERE username = $1 AND id_user != $2",
          [username, req.params.id]
        );
        if (username_terpakai.rows.length > 0)
          return res.json(
            new Response({ message: "username has been registered" }, false)
          );

        const { rows } = await db.query(
          `UPDATE users SET 
        email_user = $1,
        username = $2,
        role = $3
        WHERE id_user = $4 RETURNING *;`,
          [email_user, username, role, req.params.id]
        );
        res.json(
          new Response({
            data: rows[0],
          })
        );
      }
    } catch (e) {
      console.error(e);
      res.json(
        new Response({ message: "failed edit user" + e.toString() }, false)
      );
    }
  });
  router.delete("/delete/:id", async function (req, res, next) {
    try {
      const { rows } = await db.query("DELETE FROM users WHERE id_user = $1", [
        req.params.id,
      ]);
      res.json(new Response({ message: "Berhasil menghapus User" }, true));
    } catch (e) {
      res.json(
        new Response({ message: "failed add user" + e.toString() }, false)
      );
    }
  });

  return router;
};
