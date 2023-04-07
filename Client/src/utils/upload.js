import axios from "axios";
const config = {
    headers: {
      "Content-Type": "application/json",
      
      "Authorization": "Basic " + btoa("126612412697752	:lmOSPwpjPGKipg0dhlUnl5kbCbY")

    }
  };
const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "fixitpfe");
    

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/diy1c69hu/image/upload", data);
      const {url} = res.data;
      console.log(res.data)
      return url;

    } catch (err) {
      console.log(err)
    }
  };
  export default upload;