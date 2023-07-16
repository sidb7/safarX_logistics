interface IProductData{
    props:{
        itemImage: any,
        header: string,
        text: string
    }[]
}

const ProductCard: React.FunctionComponent<IProductData> =  ({props}) => {
    return(
        <div>
            {
                props.map((each, index) => {
                    return(
                        <div className="flex gap-x-2 border-2 rounded-lg p-4 w-[238px] mt-4 border-[#E8E8E8]">
                            <img src={each.itemImage} alt="" />
                            <div>
                                <p className="text-[16px] font-medium">{each.header}</p>
                                <p className="text-[14px]">{each.text}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default ProductCard;