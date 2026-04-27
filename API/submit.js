const express = require("express");
const router = express.Router();
const Form = require("../Models/talentForm");

//POST route to handle form submission
router.post('/', async (req, res)=> {
    const { name, age, email, talent} = req.body;

    try{
        //Create a new document in the database
        const formEntry = new Form({ name, age, email, talent });
        const savedEntry = await formEntry.save(); //Save to MongoDB
        console.log("Saved Data: ", savedEntry);

        res.status(200).json({message: "Form Submitted Successfully", data: savedEntry });
    } catch (error) {
        console.error("Error saving form data:", error);

        //Handle duplicate email error 
        if (error.code ===  11000) {
            res.status(400).json({ message: "Email already exists!" });
        } else{
            res.status(500).json({ message: "Error saving form data." });
        }
    }
});

module.exports = router;



// const express = require("express");
// const router = express.Router();

// router.post("/", (req, res) => { 
//     const {name, age, email, talent} = req.body;

//     console.log("Recieved Data: ", {name, age, email, talent} );

//     res.status(200).json({message: " Form Submitted Successfully"});
// });

// module.exports = router;