const ToolBar = ( { openCreatePortal, increaseOrder, decreaseOrder} ) => {

    return (
        <div className="compToolBar mb-4">
            <i onClick={openCreatePortal} className="bi bi-plus-circle mx-2"></i>
            <i onClick={increaseOrder} className="bi bi-arrow-up mx-2"></i>
            <i onClick={decreaseOrder} className="bi bi-arrow-down mx-2"></i>
        </div>
    )
}

export default ToolBar;