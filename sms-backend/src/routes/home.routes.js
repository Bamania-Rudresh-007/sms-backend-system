import express from "express";
import { addStudent, getAllStudent, updateStudent, deleteStudent } from "../controllers/crudOperations.controller.js";
import protect from "../middlewares/auth.middleware.js"

const operationsRouter = express.Router();


operationsRouter.get("/", protect, getAllStudent);
operationsRouter.post("/", protect, addStudent);
operationsRouter.patch("/:id", protect, updateStudent);
operationsRouter.delete("/:id", protect, deleteStudent);

export default operationsRouter;