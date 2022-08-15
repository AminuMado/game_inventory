const Developer = require("../models/developer");

// Display list of All Developers
exports.developer_list = (req, res) => {
  Developer.find().exec((err, list_developer) => {
    if (err) {
      return next(err);
    }
    // Successful
    res.render("developer_list", {
      title: "All Developers",
      developer_list: list_developer,
    });
  });
};

// Display Detail page for a Specific Developer
exports.developer_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Developer Detail: ${req.params.id}`);
};

// Display Create Form on GET
exports.developer_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Developer Create GET");
};

// Handle Create on POST
exports.developer_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Developer Create POST");
};

// Display Delete Form on GET
exports.developer_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Developer Delete GET");
};

// Handle Delete on POST
exports.developer_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Developer Delete POST");
};

// Display Update Form on GET
exports.developer_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Developer Update GET");
};

// Handle Update on POST
exports.developer_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: DeveloperUpdate POST");
};
