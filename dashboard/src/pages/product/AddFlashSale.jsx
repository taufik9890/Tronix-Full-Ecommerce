/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { Radio, Select, Space } from "antd";

const AddFlashSale = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [monthName, setMonthName] = useState({
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  });

  const [options, setOptions] = useState({});
  const [idList, setIdList] = useState("");

  useEffect(() => {
    async function allProduct() {
      let { data } = await axios.get(
        "http://localhost:8000/api/v1/product/allproduct"
      );
      let arr = [];
      data.map((item) => arr.push({ value: item._id, label: item.name }));
      setOptions(arr);
    }
    allProduct();
  }, []);

  const handleChange = (value) => {
    setIdList(value);
  };

  let handleDateChange = (e) => {
    let arr = e.target.value;
    let year = arr.split("-")[0];
    let month = arr.split("-")[1];
    let day = arr.split("-")[2];

    setDate(`${monthName[month]} ${day}, ${year}`);
  };

  let handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  let handleSubmit = async () => {
    let { data } = await axios.post(
      "http://localhost:8000/api/v1/product/flashsale",
      {
        time: date + " " + time,
        idList: idList,
      }
    );
    console.log(data);
  };

  return (
    <>
      <input type="date" onChange={handleDateChange} />
      <input type="time" onChange={handleTimeChange} />
      <Select
        mode="multiple"
        placeholder="Please select"
        // defaultValue={["a10", "c12"]}
        onChange={handleChange}
        style={{
          width: "100%",
        }}
        options={options}
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default AddFlashSale;
