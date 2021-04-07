const http = require("http");

const fs =  require("fs");

const allFiles = fs.readdirSync("./", { withFileTypes: true });

const htmlFiles = allFiles.map((entry) => {
  console.log(entry);

  if (entry.name === "index.html") {
    return "";
  } else {
    return entry.name.slice(0, -5);
  }
})

const server = http.createServer((req, res) => {
const requestURL = req.url.slice(1);

if (htmlFiles.includes(requestURL)) {
  if (requestURL === "") {
    const response = fs.readFileSync("./index.html", "utf8");
    res.end(response);
  } else {
    const fileResponse = fs.readFileSync("./" + requestURL + ".html")
    res.end(fileResponse);
  }
} else {
  const fileResponse = fs.readFileSync("./404ErrorPage.html", "utf8");
  res.end(fileResponse);
}
});


server.listen(3000, () => {
});