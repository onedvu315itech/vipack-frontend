import axios from "api/aixos";

const getAllProduct = async (name, categoryId) => {
    return await axios.get(`/api/products?keyword=${name}&category=${categoryId}`,
        {
            params: {
                name: name,
                categoryId: categoryId
            }
        }
    );
}

export default {
    getAllProduct
}