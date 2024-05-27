class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;//query=Product.find()
    this.queryStr = queryStr;//queryStr=keyword
  }
  search() {
    //name=HII hase if query ma then keyword="HII" avse
    // console.log(this.queryStr.keyword); //this becomes object of conditions
    // console.log(this.queryStr)//{ keyword: '19' }
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, //hii ne match karse also jema khiik is there
            $options: "i", //case insensitive
          },
        }
      : {}; //if keyword nai apyu hoi to all products get returned
    // console.log(this.queryStr.keyword); //this becomes object of conditions
    // console.log(keyword);{ name: { '$regex': '19', '$options': 'i' } }
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryObj = { ...this.queryStr }; //we should not manipulate original queryStr so we will create new object by ...  so that it creates new in memory instead of only referencing
    // console.log(queryObj);//ama by default jetlu hase etlu avse params ma but will exclude some
    const removeField = ["page", "limit", "keyword"];
    removeField.forEach((el) => {
      delete queryObj[el];
    });
    //if we want price  filter we write price[gte]=20 and in console OUTPUT= {duration:{gte:20}}
    //but we want to find {duration:{$gte:20}} because dollar is imp lied in mongoose
    //  Advanced filtering for converting gte to $gte
    let queryStr = JSON.stringify(queryObj); //query object all of features are entered
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); //manually in req.query {duration:{$gte:5}}
    this.query = this.query.find(JSON.parse(queryStr)); //upar stringify karyu replace pela so will do it parse
    return this;
  }
  paginate(resultPerPage) {
    //50 products per page 10 products
    //1st page to show then no skip
    //2nd page  to show then skip 10
    //3rd page to skip 20
    const currentPage = Number(this.queryStr.page) || 1;//*1 because converting it to numbers
   // const limit = this.queryStr.limit * 1 || 100;
   const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip)
    return this;
  }
}
module.exports = ApiFeatures;
