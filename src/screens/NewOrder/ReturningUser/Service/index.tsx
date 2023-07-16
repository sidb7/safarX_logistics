import serviceIcon from "../../../../assets/serv/service.svg";
import ServiceType from "./serviceType";
import {customServiceData} from "../../../../utils/dummyData"

const ReturningService = () => {
    return(
        <div>
           
            <div className="flex mx-5 gap-x-2">
                <img src={serviceIcon} alt="" />
                <p>Service</p>
            </div>
            <div className="mx-5">
                <ServiceType props={customServiceData} />
            </div>
         
        </div>
    )
}
export default ReturningService;