// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// Render CSS Files
app.use(express.static("public"));

// Declaring todo and completed arrays.
var task: string[], complete: string[];
task = [];
complete = [];

// Adding a new task.
app.post("/addtask", function (req: any, res: any) {
  var newTask = req.body.newtask;
  // Add the new task from the post route
  task.push(newTask);
  res.redirect("/");
});

app.post("/removetask", function (req: any, res: any) {
  var completeTask = req.body.check;
  // Check for the "typeof" the different completed task, then add into the complete task
  if (typeof completeTask === "string") {
    complete.push(completeTask);
    // Check if the completed task already exits in the task when checked, then remove it
    task.splice(task.indexOf(completeTask), 1);
  } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      task.splice(task.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});

// Render the ejs and display added task, completed task
app.get("/", function (req: any, res: any) {
  res.render("index", { task: task, complete: complete });
});

// Set app to listen on port 3000
app.listen(3000, function () {
  console.log("server is running on port 3000");
});