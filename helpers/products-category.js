const ProductCategory = require('../model/products-category.model')

module.exports.getSubCategory = async(parentId) =>{
  const getCategory =async(parentId) =>{
    const subs = await ProductCategory.find({
      parent_id : parentId,
      delete : false,
      status : "active"
    });
    let allSub = [...subs];
    for (const sub of subs) {
      const childs =await getCategory(sub.id);
      allSub - allSub.concat(childs);
    }
    return allSub;
  }
  const result = await getCategory(parentId);

  return result;

  // End getSubCategory function.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.  // End of script.
}