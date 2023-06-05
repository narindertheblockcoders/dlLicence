import axios from "axios";
export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const { token } = req.body;
      const { data } = req.body;
      var config = {
        method: "post",
        url: "http://134.122.64.108:3005/api/v1/useradmin/updateclientdetail",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      await axios(config).then((response) => {
        res.status(200).json({ data: response.data });
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}
