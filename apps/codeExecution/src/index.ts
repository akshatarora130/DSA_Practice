import express from "express"
import fs from "fs"
import path from "path"
import {exec} from "child_process"
import cors from "cors"
import {PORT} from "@repo/common/src";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/execute", async (req, res) => {
    const body = req.body;
    const filePath = path.join(__dirname, `code/test.${body.lang}`);
    const data = body.code;
    fs.writeFile(filePath, data, {
        encoding: "utf-8"
    }, (err) => {
        if (!err) {
            if(body.lang == "java"){
                exec(`javac ${path.join(__dirname, `code/test.java`)} `, (error, stdout, stderr) => {
                    if(!error){
                        exec(`cd ${path.join(__dirname, `code`)} && java test`, (error, stdout, stderr) => {
                            if(!error){
                                res.status(200).json({
                                    message: "Code executed suucessfully",
                                    output: stdout
                                })
                            }
                            else {
                                res.status(404).json({
                                    message: `Error while executing file`,
                                    error: error,
                                    stderr: stderr
                                })
                            }
                        })
                    }
                    else{
                        res.status(404).json({
                            message: `Error while creating class file`,
                            error: error,
                            stderr: stderr
                        })
                    }
                })
            }
        } else {
            res.status(404).json({
                message: `Error while writing file: ${err}`
            });
            return;
        }
    })

})

app.listen(PORT, () => {
    console.log("Server started")
})