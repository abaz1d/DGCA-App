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
      let query = `SELECT COUNT(*) AS total FROM mpe`;
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
      query = `SELECT * FROM mpe`;
      if (search_data !== "") {
        query += ` WHERE ${search_type}${
          search_type === "date" ? "::DATE" : ""
        } ILIKE '%${search_data}%'`;
      }
      query += ` ORDER BY id_mpe ASC LIMIT ${total_row_displayed} OFFSET ${row_number};`;
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
        _18: { sat: false, unsat: false, na: false },
      };
      const inspector = {
        _1: { name: "", signature: false },
        _2: { name: "", signature: false },
        _3: { name: "", signature: false },
        _4: { name: "", signature: false },
      };
      const { rows } = await db.query(
        "INSERT INTO public.mpe(company_name, certificate_number, checklist, inspector) VALUES($1, $2, $3, $4) RETURNING *",
        ["-", "-", checklist, inspector]
      );
      res.json(new Response(rows));
    } catch (e) {
      console.error(e);
      res.status(500).json(new Response(e, false));
    }
  });

  router.post("/savempe", async function (req, res, next) {
    try {
      const {
        id_mpe,
        company_name,
        certificate_number,
        type_inspection,
        checklist,
        inspector,
        remark,
        date_time,
      } = req.body;
      const { rows } = await db.query(
        "UPDATE public.mpe SET company_name = $1, certificate_number = $2, type_inspection = $3, checklist = $4, inspector = $5, remark = $6, date_time = $7 WHERE id_mpe = $8 RETURNING *;",
        [
          company_name,
          certificate_number,
          type_inspection,
          checklist,
          inspector,
          remark,
          date_time,
          id_mpe,
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

      reqSQL = "SELECT * FROM public.mpe WHERE id_mpe = $1 ORDER BY id_mpe ASC";
      const { rows } = await db.query(reqSQL, [req.params.id]);
      res.json(new Response(rows));
    } catch (e) {
      console.error(e);
      res.status(500).json(new Response(e, false));
    }
  });

  router.delete("/deletempe/:id", async function (req, res, next) {
    try {
      const { rows } = await db.query(
        "DELETE FROM public.mpe WHERE id_mpe = $1",
        [req.params.id]
      );

      res.json(new Response({ message: "delete MPE success" }, true));
    } catch (e) {
      console.error(e);
      res.status(500).json(new Response(e, false));
    }
  });

  return router;
};
