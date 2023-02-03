import { Link } from "react-router-dom"

const Breadcrumb = (props) => {
    return(
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {props.path.map((e, index) => { 
                    return <li key={"breadcrump"+index} className={"breadcrumb-item" + (index==props.path.lenght-1 ? ' active' : '')}>
                        <Link to={"/app/decomp/"}>{e}</Link>
                        </li>})}
            </ol>
        </nav>
    )
}

export default Breadcrumb;