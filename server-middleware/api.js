const express = require("express");
const app = express();
const cors = require("cors");

const router = express.Router();
app.use(cors());
app.use(express.json());

app.use(router);

router.get("/collections", (req, res) => {
  return res.json({
    data: [
      {
        uuid: 1,
        name: "New Arrivals",
      },
      {
        uuid: 2,
        name: "Summer",
      },
      {
        uuid: 3,
        name: "Winter",
      },
      {
        uuid: 4,
        name: "CNY 2021",
      },
    ],
  });
});

router.get("/categories", (req, res) => {
  return res.json({
    data: [
      {
        uuid: 1,
        name: "Men",
      },
      {
        uuid: 2,
        name: "Women",
      },
      {
        uuid: 3,
        name: "Sport",
      },
    ],
  });
});

router.post("/products", (req, res) => {
  return res.json({
    data: [
      {
        id: 1,
        name: "Oversized W Sweater",
        size: ["S", "M", "L", "XL"],
        price: 700,
        img: [
          {
            color: "#fff",
            url: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            color: "#000000",
            url: "https://images.giordano.com/productphoto/01019260002/02_1_2_1_1000_1000.jpg",
          },
        ],
      },
      {
        id: 2,
        name: "Oversized W Sweater",
        size: ["S", "M", "L", "XL"],
        price: 700,
        img: [
          {
            color: "#fff",
            url: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            color: "#000000",
            url: "https://images.giordano.com/productphoto/01019260002/02_1_2_1_1000_1000.jpg",
          },
        ],
      },
      {
        id: 3,
        name: "Oversized W Sweater",
        size: ["S", "M", "L", "XL"],
        price: 700,
        img: [
          {
            color: "#fff",
            url: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            color: "#000000",
            url: "https://images.giordano.com/productphoto/01019260002/02_1_2_1_1000_1000.jpg",
          },
        ],
      },
      {
        id: 4,
        name: "Oversized W Sweater",
        size: ["S", "M", "L", "XL"],
        price: 700,
        img: [
          {
            color: "#fff",
            url: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            color: "#000000",
            url: "https://images.giordano.com/productphoto/01019260002/02_1_2_1_1000_1000.jpg",
          },
        ],
      },
      {
        id: 5,
        name: "Oversized W Sweater",
        size: ["S", "M", "L", "XL"],
        price: 700,
        img: [
          {
            color: "#fff",
            url: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            color: "#000000",
            url: "https://images.giordano.com/productphoto/01019260002/02_1_2_1_1000_1000.jpg",
          },
        ],
      },
      {
        id: 6,
        name: "Oversized W Sweater",
        size: ["S", "M", "L", "XL"],
        price: 700,
        img: [
          {
            color: "#fff",
            url: "https://images.giordano.com/productphoto/05319260001/03_1_2_1_1000_1000.jpg",
          },
          {
            color: "#000000",
            url: "https://images.giordano.com/productphoto/01019260002/02_1_2_1_1000_1000.jpg",
          },
        ],
      },
    ],
    total_items: 64,
  });
});

module.exports = {
  path: "/api",
  handler: app,
};
