import { Image, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ViewProduct = () => {
  const [productList, setProductList] = useState([]);
  const userInfo = useSelector((state) => state.user.value);

  useEffect(() => {
    async function viewProduct() {
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/product/allproduct"
      );

      let productData = [];
      data.map((item) => {
        let details = item.description;
        const oembedRegex = /<oembed[^>]*>/g;
        const oembedMatch = details?.match(oembedRegex);

        if (oembedMatch) {
          const oembedUrl = oembedMatch[0].match(/url="([^"]*)"/)[1];
          const embedUrl = oembedUrl.split("v=")[1].split("&")[0];
          const iframeElement = `<iframe src="https://www.youtube.com/embed/${embedUrl}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
          details = details.replace(oembedRegex, iframeElement);
        }
        productData.push({
          key: item._id,
          name: item.name,
          description: details,
          image: item.image,
        });
      });
      setProductList(productData);
    }
    viewProduct();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (_, record) => (
        <div dangerouslySetInnerHTML={{ __html: record.description }}></div>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <Image width={50} src={`http://localhost:8000${record.image}`} />
      ),
    },
  ];
  return (
    userInfo.role != "User" && (
      <>
        <Table dataSource={productList} columns={columns} />
      </>
    )
  );
};

export default ViewProduct;
