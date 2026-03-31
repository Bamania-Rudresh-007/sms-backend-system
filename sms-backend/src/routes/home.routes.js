import express from "express";
import { addStudent } from "../controllers/crudOperations.controller.js";

const operationsRouter = express.Router();


operationsRouter.post("/", addStudent);

export default operationsRouter;