var express = require("express");
var mysql = require("mysql");
var bodyparser = require("body-parser");
var mysql = require("mysql");
var bodyparser = require("body-parser");
var app = express();
var urlencodedparser = bodyparser.urlencoded({ extended: false });

app.set("view engine", "ejs");
app.use("/assets", express.static(__dirname + "/assets"));

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "aanu"
});
connection.connect(err => {
    if (err) throw err;
    console.log("connected");
});

app.get("/", (req, res) => res.render("index"));
app.get("/insert/eventing", (req, res) => res.render("insertevent"));
app.get("/insert/college", (req, res) => res.render("insertcollege"));
app.get("/insert/users", (req, res) => res.render("insertuser"));
app.get("/insert/competation", (req, res) => res.render("insertcompetation"));
app.get("/insert/winners", (req, res) => res.render("insertwinner"));

app.get("/delete", (req, res) => res.render("deletion/deletewinners"));

app.get("/update", (req, res) => res.render("update/updatedetails"));
app.get("/success", (req, res) => res.render("errorDetection/success"));
app.get("/failure", (req, res) => res.render("errorDetection/failure"));

app.post("/insert/eventing", urlencodedparser, function(req, res) {
    var Id = req.body.event_id;
    var eventName = req.body.event_name;
    var manager = req.body.event_manager;
    var EventType = req.body.event_type;
    var amount = req.body.event_amount;

    var sql =
        "Insert into eventing VALUES ('" + Id + "','" + eventName + "','" + manager + "','" + EventType + "','" + amount + "')";
    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            console.log("1 row inserted");
            res.redirect("/success");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});

app.post("/insert/college", urlencodedparser, function(req, res) {
    var Id = req.body.college_id;
    var CollegeName = req.body.college_name;

    var sql =
        "Insert into college VALUES ('" + Id + "','" + CollegeName + "')";
    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            console.log("1 row inserted");
            res.redirect("/success");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});
app.post("/insert/users", urlencodedparser, function(req, res) {
    var Id = req.body.usr_id;
    var userName = req.body.usr_name;
    var Sex = req.body.usr_gender;
    var collegeid = req.body.college_id;
    var phone = req.body.usr_phone;
    var EventNo = req.body.event_id;

    var sql =
        "Insert into users VALUES ('" + Id + "','" + userName + "','" + Sex + "','" + collegeid + "','" + phone + "','" + EventNo + "')";
    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            console.log("1 row inserted");
            res.redirect("/success");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});
app.post("/insert/competation", urlencodedparser, function(req, res) {
    var Date = req.body.competation_date;
    var Timing = req.body.competation_timing;

    var sql =
        "Insert into competation VALUES ('" + Date + "','" + Timing + "')";
    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            console.log("1 row inserted");
            res.redirect("/success");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });

});
app.post("/insert/winners", urlencodedparser, function(req, res) {
    var Id = req.body.winners_id;
    var eventid = req.body.event_id;
    var usersid = req.body.usr_id;
    var position = req.body.winners_position;

    var sql =
        "Insert into winners VALUES ('" + Id + "','" + eventid + "','" + usersid + "','" + position + "')";
    connection.query(sql, (err, result) => {
        try {
            if (err) throw err;
            console.log("1 row inserted");
            res.redirect("/success");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});

app.post("/delete", urlencodedparser, function(req, res) {
    var Id = req.body.winners_id;
    var sql = "delete from winners where winners_id='" + Id + "'";
    connection.query(sql, function(err, result) {
        try {
            if (err) throw err;
            console.log("Deletion was successful");
            res.redirect("/delete");
        } catch (e) {
            res.redirect("/failure");
            console.log("the User was already deleted");
        }
    });
});


app.post("/update1", urlencodedparser, function(req, res) {
    var Name = req.body.usr_name;
    var Phone = req.body.usr_phone;
    var sql =
        "update users SET usr_phone='" +
        Phone +
        "' WHERE usr_name='" +
        Name +
        "'";
    connection.query(sql, function(err, result) {
        try {
            if (err) throw err;
            res.redirect("/update");
            console.log("data successfully updated");
        } catch (e) {
            res.redirect("/failure");
            console.log("error was thrown");
        }
    });
});

app.post("/update2", urlencodedparser, function(req, res) {
    var Id = req.body.event_id;
    var Amount = req.body.event_amount;
    sql =
        "update eventing set event_amount='" + Amount + "' where event_id='" + Id + "'";
    connection.query(sql, function(err, result, fields) {
        if (err) throw err;
        console.log("data was updated successfully");
        res.redirect("/update");
    });
});

app.get("/display", function(req, res) {
    sql = "select * from eventing";
    var id = [];
    var names = [];
    var Manager = [];
    var Type = [];
    var Amount = [];

    connection.query(sql, function(err, result) {
        if (err) throw err;

        for (var i = 0; i < result.length; i++) {
            id[i] = result[i].event_id;
            names[i] = result[i].event_name;
            Manager[i] = result[i].event_manager;
            Type[i] = result[i].event_type;
            Amount[i] = result[i].event_amount;
        }
        console.log(id);

        res.render("display/displayDetails", {
            id: id,
            names: names,
            Manager: Manager,
            Type: Type,
            Amount: Amount,
        });
    });
});

app.listen(4545, () => console.log("listens to port 4545"));