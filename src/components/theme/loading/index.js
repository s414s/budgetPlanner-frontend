const Loading = (props) => {

    return (
        <div className="text-center mt-5">
            <p>{props.text}</p>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loading;
