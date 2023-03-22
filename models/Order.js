const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        title:{
          type:String,
        },                
        desc:{
          type:String,
        }, 
        img:{
          type:String,
        },
        size:{
          type:String,
        },  
        color:{
          type:String,
        }, 
id:{
  type:String
}
      },
    ],
    
    amount: { type: Number, required: true },
    address: { type: Object },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);