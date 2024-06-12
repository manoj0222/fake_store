interface ProductType {
    id: number;
    href: string;
    image: string;
    title: string;
    price: string;
    description:string;
    category:string|null;
    rating:{
      rate:number|0
      count:number|0
    }|null;
  }
  


  export default ProductType;