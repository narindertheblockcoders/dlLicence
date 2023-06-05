import axios from "axios";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const data = req.body;
      var config = {
        method: "post",
        url: "http://134.122.64.108:3005/api/v2/auth/forgotpassword",
        data: data,
      };
      await axios(config).then(function (response) {
        console.log("response", response.data);
        res.status(200).json({ data: response.data });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ Error: err });
    }
  }
}
