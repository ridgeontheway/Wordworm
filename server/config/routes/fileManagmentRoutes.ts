import express from "express";
import { controller as bookController } from "../controllers/bookController";

function parseWordRetrievalParameters(reqParams: string[]) {
  const fileNameStr = reqParams[0];
  const startWordStr = reqParams[1];
  const incrementValueStr = reqParams[2];

  var startWord = 0;
  var incrementValue = -1;

  try {
    startWord = parseInt(startWordStr);
    incrementValue = parseInt(incrementValueStr);
  } catch (e) {}
  return {
    FileName: fileNameStr,
    StartWord: startWord,
    IncrementValue: incrementValue
  };
}

module.exports = (app: express.Application) => {
  app.post("/api/file-upload", (req, res) => {
    return res.json(bookController.bookUpload(req, res, "image"));
  });

  app.get("/api/word-retrieval/:info", (req, res) => {
    const convertedParams = parseWordRetrievalParameters(
      req.params.info.split(",")
    );
    res.send(
      bookController.retrieveWords(
        convertedParams["FileName"],
        convertedParams["StartWord"],
        convertedParams["IncrementValue"]
      )
    );
  });

  app.post("/api/file-upload", (req, res) => {
    return res.json(bookController.bookUpload(req, res, "image"));
  });

  app.get("/api/word-retrieval/:info", (req, res) => {
    const convertedParams = parseWordRetrievalParameters(
      req.params.info.split(",")
    );
    res.send(
      bookController.retrieveWords(
        convertedParams["FileName"],
        convertedParams["StartWord"],
        convertedParams["IncrementValue"]
      )
    );
  });
};
