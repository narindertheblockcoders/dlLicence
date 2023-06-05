import axios from "axios";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const { token } = req.body;
      var config = {
        method: "post",
        url: "http://134.122.64.108:3005/api/v1/admindata/getalllocationname",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios(config);

      res.status(200).json({ data: response.data });
    } catch (error) {
      console.log("ERROR---->", error);
    }
  }
}
