const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");
const Product = require("../models/productModel");


// 2.38 
// 1 @DES CREATE PRODUCT API  done
exports.addProduct = async (req, res, next) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const product = await Product.create(req.body);
    res.status(200).json({
      success: true,
      message: "Product added successfully",
      product: product,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// 2 @DES GET SINGLE PRODUCT API  done
exports.getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// 3 @DES GET ALL PRODUCT API   done
exports.getAllProducts = async (req, res, next) => {

  try {
    // filtering product
    const queryObj = { ...req.query };
    const excludeField = ["page", "sort", "limit", "feilds"];
    excludeField.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    // 
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));
    // 

    // sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
      console.log(query)
    } else {
      query = query.sort("-createdAt");
    }
    // limiting the feilds
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }
    // pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    console.log(page, limit,skip)
    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("this page does not exists");
    }
    const product = await query;
    res.status(200).json({
      success: true,
      products: product,
    });
  } catch (error) {}
};

// 4 @DES DELETE PRODUCT API   done 
exports.deleteProduct = async (req, res, next) => {
  const {id} = req.params;
  validateMongoDbId(id);
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product delete successfully..",
      product
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// 5 @DES UPDATE PRODUCT API  done
exports.updateProduct = async (req, res, next) => {
      const { id } = req.params;
    // validateMongoDbId(id);
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  try {
    const product = await Product.findByIdAndUpdate(id , req.body, {
      new: true,
    });
    console.log(product)
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product update successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// 6 @DES ADDWISHLIST PRODUCT API done
exports.addWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});


// 5 55 min
// 7 @DES RATING PRODUCT API
exports.ratingProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log(req.user)
  const { star, prodId, comment } = req.body;

  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedBy.toString() === _id.toString()
    );
   

    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
        //  "ratings._id": alreadyRated._id,
        "ratings._id": alreadyRated._id,
        },
        {
          // $set: { "ratings.$star": star, "ratings.$.comment": comment },
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
      // res.status(200).json({
      //   success:true,
      //   updateRating
      // })
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedBy: _id,
            },
          },
        },
        {
          new: true,
        }
      );
      // res.status(200).json({
      //   success:true,
      //   rateProduct
      // })
    }

     // Calculate totalRating and update the product
    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingSum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingSum / totalRating);

    // Update the product with the calculated average rating
    let finalProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      finalProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
       error: error.error
       });
  }
});
