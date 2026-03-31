import express from "express";
import { addStudent, getAllStudent, updateStudent, deleteStudent } from "../controllers/crudOperations.controller.js";

const operationsRouter = express.Router();


operationsRouter.get("/", getAllStudent);
operationsRouter.post("/", addStudent);
operationsRouter.patch("/:id", updateStudent);
operationsRouter.delete("/:id", deleteStudent);

export default operationsRouter;