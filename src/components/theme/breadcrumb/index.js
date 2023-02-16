import { Link } from "react-router-dom"

const Breadcrumb = (props) => {

    const levelUrl = {
        0: "/app/decomp/folders/",
        1: "/app/decomp/groups/",
        2: "/app/decomp/items/"
    };

    return <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            {props.path.map((e, index) => {
                return <li
                    key={e[0]}
                    className={"breadcrumb-item" + (index === props.path.length - 1 ? ' active' : '')}>
                    {index === props.path.length - 1
                        ? e[1]
                        : <Link to={levelUrl[index] + e[0]}>{ e[1] }</Link>
                    }
                </li>
            })}
        </ol>
    </nav>
};

export default Breadcrumb;