var express = require("express");
var router = express.Router();
const fs = require("fs");
var path = require("path");
const { Response } = require("../helpers/util");

/* GET home page. */
module.exports = function (db) {
  router.get("/", async function (req, res, next) {
    const { search_type, search_data, page_number, total_row_displayed } =
      req.query;
    let row_number;
    if (page_number < 2) {
      row_number = 0;
    } else {
      row_number = (page_number - 1) * total_row_displayed;
    }

    try {
      let query = `SELECT COUNT(*) AS total FROM mfa`;
      if (search_data !== "") {
        query += ` WHERE ${search_type}${
          search_type === "date" ? "::DATE" : ""
        } ILIKE '%${search_data}%'`;
      }
      const totalPage = await db.query(query);
      let data = totalPage.rows;
      let total_pages;
      if (data[0].total % total_row_displayed == 0) {
        total_pages = parseInt(data[0].total / total_row_displayed);
      } else {
        total_pages = parseInt(data[0].total / total_row_displayed) + 1;
      }
      query = `SELECT * FROM mfa`;
      if (search_data !== "") {
        query += ` WHERE ${search_type}${
          search_type === "date" ? "::DATE" : ""
        } ILIKE '%${search_data}%'`;
      }
      query += ` ORDER BY id_mfa ASC LIMIT ${total_row_displayed} OFFSET ${row_number};`;
      const { rows } = await db.query(query);
      res.json(new Response({ rows, total_pages }));
    } catch (e) {
      console.error(e);
      res.status(500).json(new Response(e, false));
    }
  });

  router.post("/create", async function (req, res, next) {
    try {
      const checklist = {
        _1: { sat: false, unsat: false, na: false },
        _2: { sat: false, unsat: false, na: false },
        _3: { sat: false, unsat: false, na: false },
        _4: { sat: false, unsat: false, na: false },
        _5: { sat: false, unsat: false, na: false },
        _6: { sat: false, unsat: false, na: false },
        _7: { sat: false, unsat: false, na: false },
        _8: { sat: false, unsat: false, na: false },
        _9: { sat: false, unsat: false, na: false },
        _10: { sat: false, unsat: false, na: false },
        _11: { sat: false, unsat: false, na: false },
        _12: { sat: false, unsat: false, na: false },
        _13: { sat: false, unsat: false, na: false },
        _14: { sat: false, unsat: false, na: false },
        _15: { sat: false, unsat: false, na: false },
        _16: { sat: false, unsat: false, na: false },
        _17: { sat: false, unsat: false, na: false },
      };
      const inspector = {
        _1: { name: "", signature: false },
        _2: { name: "", signature: false },
        _3: { name: "", signature: false },
        _4: { name: "", signature: false },
      };
      const { rows } = await db.query(
        "INSERT INTO public.mfa(company_name, certificate_number, checklist, inspector) VALUES($1, $2, $3, $4) RETURNING *",
        ["-", "-", checklist, inspector]
      );
      res.json(new Response(rows));
    } catch (e) {
      console.error(e);
      res.status(500).json(new Response(e, false));
    }
  });

  router.post("/savemfa", async function (req, res, next) {
    try {
      const {
        id_mfa,
        company_name,
        certificate_number,
        type_inspection,
        checklist,
        inspector,
        remark,
        date_time,
      } = req.body;
      const { rows } = await db.query(
        "UPDATE public.mfa SET company_name = $1, certificate_number = $2, type_inspection = $3, checklist = $4, inspector = $5, remark = $6, date_time = $7 WHERE id_mfa = $8 RETURNING *;",
        [
          company_name,
          certificate_number,
          type_inspection,
          checklist,
          inspector,
          remark,
          date_time,
          id_mfa,
        ]
      );
      res.json(new Response(rows));
    } catch (e) {
      console.log(e);
      res.status(500).json(new Response(e, false));
    }
  });

  router.get("/detail/:id", async function (req, res, next) {
    try {
      let reqSQL;

      reqSQL = "SELECT * FROM public.mfa WHERE id_mfa = $1 ORDER BY id_mfa ASC";
      const { rows } = await db.query(reqSQL, [req.params.id]);
      res.json(new Response(rows));
    } catch (e) {
      console.error(e);
      res.status(500).json(new Response(e, false));
    }
  });

  router.delete("/deletemfa/:id", async function (req, res, next) {
    try {
      const { rows } = await db.query(
        "DELETE FROM public.mfa WHERE id_mfa = $1",
        [req.params.id]
      );

      res.json(new Response({ message: "delete MFA success" }, true));
    } catch (e) {
      console.error(e);
      res.status(500).json(new Response(e, false));
    }
  });

  return router;
};
