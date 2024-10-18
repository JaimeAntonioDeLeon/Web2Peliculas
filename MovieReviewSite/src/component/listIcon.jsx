import { Row, Col, Container } from "react-bootstrap"
import "../componentStyle/listIcon.css"
function ListIcon(){
    return(
<div className="listIcon  mb-2" >
    <div className="iconContainer d-flex flex-row " align="center">
    <img className='image1' style={{width:100, height: 120}} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hartz.com%2Fwp-content%2Fuploads%2F2022%2F04%2Fsmall-dog-owners-1.jpg&f=1&nofb=1&ipt=48d24e69f5f25c8f2c431ca7495446040c19430e0de3a573c869ef543ffe19ec&ipo=images" alt="No"></img>
    <img className='image2' style={{width:100, height: 120}} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hartz.com%2Fwp-content%2Fuploads%2F2022%2F04%2Fsmall-dog-owners-1.jpg&f=1&nofb=1&ipt=48d24e69f5f25c8f2c431ca7495446040c19430e0de3a573c869ef543ffe19ec&ipo=images" alt="No"></img>
    <img className='image3' style={{width:100, height: 120}} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.hartz.com%2Fwp-content%2Fuploads%2F2022%2F04%2Fsmall-dog-owners-1.jpg&f=1&nofb=1&ipt=48d24e69f5f25c8f2c431ca7495446040c19430e0de3a573c869ef543ffe19ec&ipo=images" alt="No"></img>
    </div>
        <div className=" d-flex flex-row"><h4 className="ms-5">Title</h4></div>
    </div>
    )
    }
export default ListIcon